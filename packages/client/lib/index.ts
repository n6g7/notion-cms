import debug from "debug";
import _ from "lodash";
import { UUID, BlockValues, PageBlockValues } from "@notion-cms/types";
import { loadPageChunk, queryCollection, getImageStream } from "./rpc";
import { parseProperty } from "./parse";

const log = debug("notion-cms");

export interface LiteCollectionItem<T = any> {
  id: UUID;
  meta: {
    cover: string | null;
    icon: string | null;
  };
  props: T;
  blocks?: BlockValues[];
}

export interface FullCollectionItem<T = any> extends LiteCollectionItem<T> {
  blocks: BlockValues[];
}

class Notion {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  async loadCollection(
    pageId: UUID,
    limit: number = 70
  ): Promise<LiteCollectionItem[]> {
    const pageData = await loadPageChunk({ pageId }, this.token);
    const [collection] = _.values(pageData.recordMap.collection);
    const [collectionView] = _.values(pageData.recordMap.collection_view);
    const collectionData = await queryCollection(
      {
        collectionId: collection.value.id,
        collectionViewId: collectionView.value.id,
        loader: { limit },
      },
      this.token
    );
    const blocks = _.values(collectionData.recordMap.block);
    const pages = blocks
      .filter(
        (b) =>
          collectionData.result.blockIds.includes(b.value?.id) &&
          b.value.hasOwnProperty("properties")
      )
      .map((b) => b.value);
    return await Promise.all(
      pages.map(async (b: PageBlockValues) => {
        const props = await Promise.all(
          //@ts-ignore
          Object.keys(collection.value.schema).map(async (key) => ({
            [collection.value.schema[key].name]: await parseProperty(
              // @ts-ignore
              collection.value.schema[key].type,
              // @ts-ignore
              b.properties[key],
              this.token
            ),
          }))
        );

        return {
          id: b.id,
          meta: {
            icon: b.format?.page_icon || null,
            cover: b.format?.page_cover || null,
          },
          props: _.merge({}, ...props),
        };
      })
    );
  }

  async loadCollectionItem(
    collectionPageId: UUID,
    finder: (r: LiteCollectionItem) => boolean
  ): Promise<FullCollectionItem | null> {
    const collection = await this.loadCollection(collectionPageId);
    const item = collection.find(finder);

    if (!item) return null;
    const chunk = await loadPageChunk({ pageId: item.id }, this.token);
    const blocks = Object.keys(chunk.recordMap.block)
      .map((id) => chunk.recordMap.block[id].value)
      .filter(({ type }) =>
        [
          "header",
          "text",
          "sub_header",
          "sub_sub_header",
          "image",
          "bulleted_list",
          "numbered_list",
        ].includes(type)
      );
    return { ...item, blocks };
  }

  async downloadImage(imageUrl: string, path: string, width?: number) {
    const sharp = require("sharp");
    const stream = await getImageStream(imageUrl, this.token);

    const buffer = await new Promise((resolve, reject) => {
      const bufs: any[] = [];
      stream.on("data", (d: any) => bufs.push(d));
      stream.on("error", reject);
      stream.on("end", () => resolve(Buffer.concat(bufs)));
    });

    return sharp(buffer).resize(width).webp().toFile(path);
  }
}

export default Notion;
