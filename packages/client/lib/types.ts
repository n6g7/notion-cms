import { Blocks, FilesProperty, URL, User, ISO8601Date } from "@notion-cms/types";

export interface DatabaseProps {
  [key: string]:
    | string
    | string[]
    | number
    | number[]
    | boolean
    | { start: string; end: string }
    | FilesProperty
    | User[];
}

export interface ParsedPage<Props extends DatabaseProps> {
  id: string;
  meta: {
    created_time: ISO8601Date;
    icon: URL;
    cover: URL;
  };
  props: Props;
}

export interface ParsedPageWithBlocks<Props extends DatabaseProps>
  extends ParsedPage<Props> {
  blocks: Blocks;
}
