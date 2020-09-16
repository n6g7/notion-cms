export type UUID = string;
type Role = "editor" | "reader" | "none";
export type BlockType =
  | "page"
  | "collection_view"
  | "header"
  | "text"
  | "sub_header"
  | "sub_sub_header"
  | "image"
  | "bulleted_list"
  | "numbered_list"
  | "divider";
export type DataType =
  | "person"
  | "checkbox"
  | "text"
  | "date"
  | "title"
  | "number"
  | "select"
  | "multi_select"
  | "relation";
type ParentTable = "collection" | "block" | "space";

export interface NotionWrapper<T> {
  role: Role;
  value: T;
}

export interface UserBlockValues {
  id: UUID;
  version: number;
  email: string;
  given_name: string;
  family_name: string;
  profile_photo: string;
  onboarding_completed: boolean;
  mobile_onboarding_completed: boolean;
}

interface BaseBlockValues {
  id: UUID;
  version: number;
  type: BlockType;
  created_by: UUID;
  created_time: number;
  last_edited_by: UUID;
  last_edited_time: number;
  parent_id: UUID;
  parent_table: ParentTable;
  alive: boolean;
  created_by_id: UUID;
  last_edited_by_id: UUID;
}

export interface PageBlockValues extends BaseBlockValues {
  type: "page";
  properties: {
    [k: string]: any[];
  };
  content: UUID[];
  format?: {
    page_icon?: string;
    page_cover?: string;
    page_cover_position?: number;
  };
}

export type TextModifier = ["b"] | ["i"] | ["a", string] | ["p", UUID];
export type TextSection = [string, TextModifier[]];

interface TextBlockValues<T extends BaseBlockValues["type"] = "text">
  extends BaseBlockValues {
  type: T;
  properties?: {
    title: TextSection[];
  };
}

type HeaderBlockValues = TextBlockValues<"header">;
type SubHeaderBlockValues = TextBlockValues<"sub_header">;
type SubSubHeaderBlockValues = TextBlockValues<"sub_sub_header">;
type BulletedListBlockValues = TextBlockValues<"bulleted_list">;
type NumberedListBlockValues = TextBlockValues<"numbered_list">;

interface ImageBlockValues extends BaseBlockValues {
  type: "image";
  properties: {
    source: string[][];
  };
  format: {
    block_width: number;
    display_source: string;
    block_full_width: boolean;
    block_page_width: boolean;
    block_aspect_ratio: number;
    block_preserve_scale: boolean;
  };
}

interface CollectionViewBlockValues extends BaseBlockValues {
  type: "collection_view";
  view_ids: UUID[];
  collection_id: UUID;
}

interface DividerBlockValues extends BaseBlockValues {
  type: "divider";
}

export type BlockValues =
  | PageBlockValues
  | TextBlockValues
  | HeaderBlockValues
  | SubHeaderBlockValues
  | SubSubHeaderBlockValues
  | ImageBlockValues
  | CollectionViewBlockValues
  | BulletedListBlockValues
  | NumberedListBlockValues
  | DividerBlockValues;

export type Block = NotionWrapper<BlockValues>;

export interface CollectionSchema {
  [k: string]: { name: string; type: DataType };
}

export interface CollectionFormat {
  collection_page_properties: { visible: boolean; property: string }[];
}

export type Collection = NotionWrapper<{
  id: UUID;
  version: number;
  name: string[][];
  schema: CollectionSchema;
  format: CollectionFormat;
  parent_id: UUID;
  parent_table: ParentTable;
  alive: boolean;
}>;

export interface Aggregate {
  aggregation_type: string;
  id: string;
  property: string;
  type: string;
  view_type: string;
}

export interface CollectionViewFormat {
  table_wrap: boolean;
  table_properties: { width: number; visible: boolean; property: string }[];
}

export type CollectionView = NotionWrapper<{
  id: UUID;
  version: number;
  type: string;
  name: string;
  query: {
    aggregate: Aggregate[];
  };
  format: CollectionViewFormat;
  parent_id: UUID;
  parent_table: string;
  alive: boolean;
  page_sort: UUID[];
  query2: {
    aggregate: Aggregate[];
    aggregations: { property: string; aggregator: string }[];
  };
}>;

export interface Person {
  id: UUID;
  email: string;
  given_name: string;
  family_name: string;
  profile_photo: string;
}
