import React from "react";
import debug from "debug";
import { Block } from "@notion-cms/types";

import Bookmark from "./components/Bookmark";
import Callout from "./components/Callout";
import RTO from "./RTO";
import Toggle from "./components/Toggle";
import Column from "./components/Column";
import { Blocks } from ".";

const log = debug("notion-cms:react");

export interface Props {
  block: Block;
}

const languageMapping = {
  Bash: "bash",
  CSS: "css",
  Docker: "docker",
  GraphQL: "graphql",
  HTML: "html",
  JavaScript: "javascript",
  JSON: "json",
  Makefile: "makefile",
  Markdown: "markdown",
  PHP: "php",
  Python: "python",
  Shell: "bash",
  SQL: "sql",
  TypeScript: "typescript",
  YAML: "yaml",
};

const Block: React.FC<Props> = ({ block }) => {
  switch (block.type) {
    case "heading_1":
      return (
        <h1 key={block.id}>
          <RTO objects={block.heading_1.text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2 key={block.id}>
          <RTO objects={block.heading_2.text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3 key={block.id}>
          <RTO objects={block.heading_3.text} />
        </h3>
      );
    case "paragraph":
      return (
        <p key={block.id}>
          <RTO objects={block.paragraph.text} />
        </p>
      );
    case "image":
      return (
        <figure key={block.id}>
          <img
            src={
              block.image.type == "file"
                ? block.image.file.url
                : block.image.external.url
            }
            alt={block.image.caption.map((s) => s.plain_text).join(" ")}
            width="100%"
          />
          <figcaption>
            <RTO objects={block.image.caption} />
          </figcaption>
        </figure>
      );
    case "bulleted_list_item":
    case "numbered_list_item":
      const richTextObjects =
        block.type == "bulleted_list_item"
          ? block.bulleted_list_item?.text
          : block.numbered_list_item?.text;

      let children = null;
      if (block.has_children) {
        const Wrapper =
          block.children[0].type === "bulleted_list_item" ? "ul" : "ol";
        children = (
          <Wrapper>
            {block.children.map((block) => (
              <Block block={block} key={block.id} />
            ))}
          </Wrapper>
        );
      }

      return (
        <li key={block.id}>
          <RTO objects={richTextObjects} />
          {children}
        </li>
      );
    case "divider":
      return <hr key={block.id} />;
    case "callout":
      return (
        <Callout key={block.id} icon={block.callout.icon}>
          <RTO objects={block.callout.text} />
        </Callout>
      );
    case "bookmark":
      return <Bookmark key={block.id} block={block} />;
    case "toggle":
      return <Toggle title={block.toggle.text} content={block.children} />;
    case "column_list":
      return (
        <Column.List>
          {block.children.map((col) => (
            <Column key={col.id}>
              <Blocks blocks={col.children} />
            </Column>
          ))}
        </Column.List>
      );

    // We're not rendering those block types;
    case "unsupported":
    case "template":
      return null;
    default:
      log('Ignoring unknown block type "%s": %O', (block as any).type, block);
      return null;
  }
};

export default Block;
