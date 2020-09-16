import React, { useMemo } from "react";
import { BlockValues, BlockType } from "@notion-cms/types";
import Block from "./Block";
import BlocksContext from "./BlocksContext";

interface Props {
  blocks: BlockValues[];
  rootOnly: boolean;
}

type ListType = "bulleted_list" | "numbered_list";
const listTypes: BlockType[] = ["bulleted_list", "numbered_list"];
const listMapping: Record<ListType, "ol" | "ul"> = {
  bulleted_list: "ul",
  numbered_list: "ol",
};

const Blocks: React.FC<Props> = ({ blocks, rootOnly = true }) => {
  const displayableBlocks = useMemo(
    () => (rootOnly ? blocks.filter((b) => b.isRoot) : blocks),
    [blocks, rootOnly]
  );

  // Merge list blocks into one.
  const blockElements = useMemo(() => {
    const elements = [];
    let listType: ListType = null;
    let listItems = [];
    for (let block of displayableBlocks) {
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
  }, [displayableBlocks]);

  return (
    <BlocksContext.Provider value={{ blocks }}>
      <React.Fragment>{blockElements}</React.Fragment>
    </BlocksContext.Provider>
  );
};

export default Blocks;
