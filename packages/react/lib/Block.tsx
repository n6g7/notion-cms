import React, { useContext, useMemo } from "react";
import debug from "debug";
import {
  BlockValues,
  TextSection,
  TextModifier,
  PageBlockValues,
  Person,
} from "@notion-cms/types";
import NotionLink from "./NotionLink";
import Callout from "./Callout";
import BlocksContext from "./BlocksContext";

const log = debug("notion-cms:react");

interface Props {
  block: BlockValues;
}

const makeModifier = (blocksContext: (BlockValues | Person)[]) => (
  children: JSX.Element,
  mod: TextModifier
): JSX.Element => {
  switch (mod[0]) {
    case "b":
      return <strong>{children}</strong>;
    case "i":
      return <em>{children}</em>;
    case "a":
      return <a href={mod[1]}>{children}</a>;
    case "p":
      const page = blocksContext.find(
        (b) => b.id === mod[1]
      ) as PageBlockValues;
      return (
        <NotionLink pageId={mod[1]}>
          {page.format.page_icon} {page.properties.title[0][0]}
        </NotionLink>
      );
    case "u":
      const user = blocksContext.find((b) => b.id === mod[1]) as Person;
      return (
        <span style={{ color: "rgba(55, 53, 47, 0.6)" }}>
          <span style={{ opacity: 0.6 }}>@</span>
          {user.given_name} {user.family_name}
        </span>
      );
    default:
      log('Ignoring unknown text modifier "%s": %O', mod[0], mod);
      return children;
  }
};
const Text = (sections: TextSection[]) => {
  if (!sections) return "";

  const { blocks } = useContext(BlocksContext);
  const applyModifier = useMemo(() => makeModifier(blocks), [blocks]);

  return sections.map(([text, modifiers = []]) => {
    const NewlinedText = (
      <React.Fragment>
        {text
          .split("\n")
          .reduce(
            (arr, text) => [...arr, arr.length > 0 ? <br /> : null, text],
            []
          )}
      </React.Fragment>
    );
    return modifiers.reduce(applyModifier, NewlinedText);
  });
};

const Block: React.FC<Props> = ({ block }) => {
  const { blocks } = useContext(BlocksContext);

  switch (block.type) {
    case "header":
      return <h1>{Text(block.properties?.title)}</h1>;
    case "sub_header":
      return <h2>{Text(block.properties?.title)}</h2>;
    case "sub_sub_header":
      return <h3>{Text(block.properties?.title)}</h3>;
    case "text":
      return <p>{Text(block.properties?.title)}</p>;
    case "image":
      return <img src={block.properties.source[0][0]} />;
    case "bulleted_list":
    case "numbered_list":
      const content = block.content
        ? block.content.map((id) => blocks.find((b) => b.id === id))
        : [];
      return (
        <li key={block.id}>
          {Text(block.properties?.title)}
          {content.length > 0 && (
            <ul>
              {content.map((b) => (
                <Block block={b as BlockValues} />
              ))}
            </ul>
          )}
        </li>
      );
    case "divider":
      return <hr />;
    case "callout":
      return (
        <Callout
          colour={block.format.block_color}
          icon={block.format.page_icon}
        >
          {Text(block.properties?.title)}
        </Callout>
      );
    case "quote":
      return <blockquote>{Text(block.properties?.title)}</blockquote>;
    default:
      log('Ignoring unknown block type "%s": %O', block.type, block);
      return null;
  }
};

export default Block;
