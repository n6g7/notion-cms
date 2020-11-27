import fetch from "isomorphic-unfetch";
import debug from "debug";
import {
  Block,
  Collection,
  UUID,
  CollectionSchema,
  CollectionFormat,
  Aggregate,
  Filter,
  Sort,
  CollectionView,
  NotionWrapper,
  UserBlock,
} from "@notion-cms/types";

const log = debug("notion-cms:rpc");

// Basics

interface RecordMap {
  block: {
    [k: string]: Block;
  };
  collection: {
    [k: string]: Collection;
  };
  collection_view: {
    [k: string]: CollectionView;
  };
  notion_user: {
    [k: string]: UserBlock;
  };
}

async function rpc(fnName: string, body = {}, token: string) {
  const res = await fetch(`https://www.notion.so/api/v3/${fnName}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      cookie: `token_v2=${token}`,
    },
    body: JSON.stringify(body),
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error(await getError(res));
  }
}

const s3Prefix = "https://s3-us-west-2.amazonaws.com/secure.notion-static.com/";
export async function getImageStream(
  imageId: string,
  imageUrl: string,
  token: string,
  width?: number
) {
  const notionUrl =
    `https://www.notion.so/image/${encodeURIComponent(
      imageUrl
    )}?cache=v2&table=block&id=${imageId}` + (width ? `&width=${width}` : "");
  const request = imageUrl.startsWith(s3Prefix)
    ? fetch(notionUrl, {
        headers: {
          cookie: `token_v2=${token}`,
        },
      })
    : fetch(imageUrl);
  const res = await request;

  if (res.ok) {
    return res.body;
  } else {
    throw new Error(await getError(res));
  }
}

async function getError(res: fetch.IsomorphicResponse) {
  return `Notion API error (${res.status}) \n${getJSONHeaders(
    res
  )}\n ${await getBodyOrNull(res)}`;
}

function getJSONHeaders(res: fetch.IsomorphicResponse) {
  return JSON.stringify(res.headers.raw());
}

function getBodyOrNull(res: fetch.IsomorphicResponse) {
  try {
    return res.text();
  } catch (err) {
    return null;
  }
}

// loadPageChunk

interface LoadPageChunkInput {
  pageId: string;
  limit?: number;
  cursor?: {};
  chunkNumber?: number;
  verticalColumns?: boolean;
}
interface LoadPageChunkResponse {
  recordMap: RecordMap;
}

export function loadPageChunk(
  {
    pageId,
    limit = 100,
    cursor = { stack: [] },
    chunkNumber = 0,
    verticalColumns = false,
  }: LoadPageChunkInput,
  token: string
): Promise<LoadPageChunkResponse> {
  return rpc(
    "loadPageChunk",
    {
      pageId,
      limit,
      cursor,
      chunkNumber,
      verticalColumns,
    },
    token
  );
}

// getPublicPageData

// interface GetPublicPageDataInput {
//   blockId: UUID;
//   name?: "page";
//   spaceDomain?: string;
//   showMoveTo?: boolean;
//   saveParent?: boolean;
// }
// interface GetPublicPageDataResponse {
//   spaceName: string;
//   spaceId: UUID;
//   spaceDomain: string;
//   canJoinSpace: boolean;
//   userHasExplicitAccess: boolean;
//   hasPublicAccess: boolean;
//   collectionId: UUID;
//   collectionSchema: CollectionSchema;
//   collectionFormat: CollectionFormat;
//   betaEnabled: boolean;
// }

// export function getPublicPageData({
//   blockId,
//   name = "page",
//   spaceDomain = "",
//   showMoveTo = false,
//   saveParent = false
// }: GetPublicPageDataInput): Promise<GetPublicPageDataResponse> {
//   return rpc("getPublicPageData", {
//     name,
//     blockId,
//     spaceDomain,
//     showMoveTo,
//     saveParent
//   });
// }

// queryCollection

interface QueryCollectionInput {
  collectionId: UUID;
  collectionViewId: UUID;
  loader?: {
    limit?: number;
    loadContentCover?: boolean;
    type?: string;
    userLocale?: string;
    userTimeZone?: string;
  };
  query?: {
    aggregations?: Aggregate[];
    filter?: {
      filters: Filter[];
      operator: "and" | "or";
    };
    sort?: Sort[];
  };
}
interface QueryCollectionResponse {
  result: {
    type: "table" | "list";
    blockIds: UUID[];
    aggregationResults: { id: string; value: number }[];
    total: number;
  };
  recordMap: RecordMap;
}

export function queryCollection(
  {
    collectionId,
    collectionViewId,
    loader = {},
    query = {},
  }: QueryCollectionInput,
  token: string
): Promise<QueryCollectionResponse> {
  const {
    limit = 70,
    loadContentCover = true,
    type = "table",
    userLocale = "en",
    userTimeZone = "America/Los_Angeles",
  } = loader;

  const {
    aggregations = [],
    filter = {
      filters: [],
      operator: "and",
    },
    sort = [],
  } = query;

  return rpc(
    "queryCollection",
    {
      collectionId,
      collectionViewId,
      loader: {
        limit,
        loadContentCover,
        type,
        userLocale,
        userTimeZone,
      },
      query: {
        aggregations,
        filter,
        sort,
      },
    },
    token
  );
}

// getRecordValues

interface GetRecordValuesInput {
  id: UUID;
  table: "notion_user";
}

export async function getRecordValues<T>(
  { id, table }: GetRecordValuesInput,
  token: string
): Promise<NotionWrapper<T>> {
  const { results } = await rpc(
    "getRecordValues",
    {
      requests: [{ id, table }],
    },
    token
  );
  return results[0];
}
