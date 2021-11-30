import React, { useMemo } from "react";
import { Blocks, BlockType } from "@notion-cms/types";
import Block from "./Block";

interface Props {
  blocks: Blocks;
}

type ListType = "bulleted_list_item" | "numbered_list_item";
const listTypes: BlockType[] = ["bulleted_list_item", "numbered_list_item"];
const listMapping: Record<ListType, "ol" | "ul"> = {
  bulleted_list_item: "ul",
  numbered_list_item: "ol",
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
        elements.push(
          <ListComponent key={`pre-${block.id}-list`}>
            {listItems}
          </ListComponent>
        );
        listType = null;
        listItems = [];
      }

      if (!listTypes.includes(block.type)) {
        elements.push(<Block block={block} key={block.id} />);
        continue;
      }

      listType = block.type as ListType;
      listItems.push(<Block block={block} key={block.id} />);
    }
    if (listType) {
      const ListComponent = listMapping[listType];
      elements.push(<ListComponent key="last-list">{listItems}</ListComponent>);
    }
    return elements;
  }, [blocks]);

  return <React.Fragment>{blockElements}</React.Fragment>;
};

export default Blocks;
