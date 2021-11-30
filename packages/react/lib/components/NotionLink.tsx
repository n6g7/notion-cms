import React from "react";
import { UUID } from "@notion-cms/types";

interface Props {
  pageId: UUID;
  children?: React.ReactNode;
}

export const buildNotionURL = (pageId: UUID): string =>
  `https://notion.so/${pageId.replace(/-/g, "")}`;

function NotionLink({ pageId, children }: Props) {
  return (
    <a href={buildNotionURL(pageId)} target="blank">
      {children}
    </a>
  );
}

export default NotionLink;
