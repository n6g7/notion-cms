import { Client } from "@notionhq/client";
import {
  Block,
  Blocks,
  List,
  Page as NotionPage,
  User,
  UUID,
} from "@notion-cms/types";
import debug from "debug";

import { DatabaseProps, ParsedPage, ParsedPageWithBlocks } from "./types";
import { parsePage } from "./parse";

const log = debug("notion-cms:client");

interface LoadDatabaseOpts {
  limit?: number;
  pageSize?: number;
  filter?: any;
}

class NotionClient extends Client {
  async loadDatabase<T extends DatabaseProps>(
    databaseId: UUID,
    { limit = Infinity, pageSize = 100, filter }: LoadDatabaseOpts
  ): Promise<ParsedPage<T>[]> {
    log("Loading database %s...", databaseId);
    let response: List<NotionPage> = await this.databases.query({
      database_id: databaseId,
      page_size: pageSize,
      filter,
    });
    let pages = response.results;

    // Un-paginate
    while (response.has_more && pages.length < limit) {
      log("Database %s: one more page...", databaseId);
      response = await this.databases.query({
        database_id: databaseId,
        page_size: pageSize,
        filter,
        start_cursor: response.next_cursor,
      });
      pages = pages.concat(response.results);
    }

    log("Database %s: loaded %d pages", databaseId, pages.length);

    return await Promise.all(
      pages
        .filter((p) => p.object === "page")
        .map(async (page) => parsePage<T>(page))
    );
  }

  async loadPageBlocks(pageId: UUID, deep = true, pageSize = 100) {
    log("Loading blocks for page %s...", pageId);
    let response: List<Block> = await this.blocks.children.list({
      block_id: pageId,
      page_size: pageSize,
    });
    let blocks = response.results;

    // Un-paginate
    while (response.has_more) {
      log("Page %s: one more blocks page...", pageId);
      response = await this.blocks.children.list({
        block_id: pageId,
        page_size: pageSize,
        start_cursor: response.next_cursor,
      });
      blocks = blocks.concat(response.results);
    }

    log("Page %s: loaded %d blocks", pageId, blocks.length);

    if (deep) {
      log("Page %s: loading nested blocks...", pageId);

      const promises = blocks.map((block): Promise<Block> => {
        if (!block.has_children) return Promise.resolve(block);
        return this.loadPageBlocks(block.id).then((children) => ({
          ...block,
          children,
        }));
      });
      blocks = await Promise.all(promises);
    }

    return blocks;
  }

  async loadPage<T extends DatabaseProps>(
    pageId: UUID
  ): Promise<ParsedPageWithBlocks<T>> {
    const [props, blocks]: [NotionPage, Blocks] = await Promise.all([
      this.pages.retrieve({ page_id: pageId }),
      this.loadPageBlocks(pageId),
    ]);

    return { ...(await parsePage<T>(props)), blocks };
  }

  loadUser(userId: string): Promise<User> {
    return this.users.retrieve({ user_id: userId });
  }
}

export default NotionClient;
