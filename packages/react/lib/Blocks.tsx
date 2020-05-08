import React, { useMemo } from "react";
import { BlockValues, BlockType } from "@notion-cms/types";
import Block from "./Block";

interface Props {
  blocks: BlockValues[];
}

type ListType = "bulleted_list" | "numbered_list";
const listTypes: BlockType[] = ["bulleted_list", "numbered_list"];
const listMapping: Record<ListType, "ol" | "ul"> = {
  bulleted_list: "ul",
  numbered_list: "ol",
};

const Blocks: React.FC<Props> = ({ blocks }) => {
  // Merge list blocks into one.
  const blockElements = useMemo(() => {
    const elements = [];
    let listType: ListType = null;
    let listItems = [];
    for (let block of blocks) {
      // Finshing previous list
      if (listType && block.type !== listType) {
        const ListComponent = listMapping[listType];
        elements.push(<ListComponent>{listItems}</ListComponent>);
        listType = null;
        listItems = [];
      }

      if (!listTypes.includes(block.type)) {
        elements.push(<Block block={block} />);
        continue;
      }

      listType = block.type as ListType;
      listItems.push(<Block block={block} />);
    }
    if (listType) {
      const ListComponent = listMapping[listType];
      elements.push(<ListComponent>{listItems}</ListComponent>);
    }
    return elements;
  }, [blocks]);

  return <React.Fragment>{blockElements}</React.Fragment>;
};

export default Blocks;
