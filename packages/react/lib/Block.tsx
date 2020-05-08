import React from "react";
import { BlockValues, TextSection, TextModifier } from "@notion-cms/types";

interface Props {
  block: BlockValues;
}

const modifierTags: Record<TextModifier[0], "strong" | "em"> = {
  b: "strong",
  i: "em",
};
const Text = (sections: TextSection[]) =>
  sections
    ? sections.map(([text, modifiers = []]) => {
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
        return modifiers.reduce((children, mod: TextModifier) => {
          const Component = modifierTags[mod[0]];
          return <Component>{children}</Component>;
        }, NewlinedText);
      })
    : "";

const Block: React.FC<Props> = ({ block }) => {
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
      return <li key={block.id}>{Text(block.properties?.title)}</li>;
    default:
      return null;
  }
};

export default Block;
