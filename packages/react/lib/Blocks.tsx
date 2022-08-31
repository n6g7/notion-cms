import React, { useMemo } from "react";
import { Blocks as BlocksType, BlockType } from "@notion-cms/types";
import Block from "./Block";
import DebugWrapper from "./Debug";

interface Props {
  blocks: BlocksType;
  debug?: boolean;
}

type ListType = "bulleted_list_item" | "numbered_list_item";
const listTypes: BlockType[] = ["bulleted_list_item", "numbered_list_item"];
const listMapping: Record<ListType, "ol" | "ul"> = {
  bulleted_list_item: "ul",
  numbered_list_item: "ol",
};

const Blocks: React.FC<Props> = ({ blocks, debug = false }) => {
  // Merge list blocks into one.
  const blockElements = useMemo(() => {
    const elements = [];
    let listType: ListType = null;
    let listItems = [];
    for (const block of blocks) {
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

      const blockElement = <Block block={block} key={block.id} />;
      const wrappedBlockElement = debug ? (
        <DebugWrapper block={block} key={block.id}>
          {blockElement}
        </DebugWrapper>
      ) : (
        blockElement
      );

      if (!listTypes.includes(block.type)) {
        elements.push(wrappedBlockElement);
        continue;
      }

      listType = block.type as ListType;
      listItems.push(wrappedBlockElement);
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
