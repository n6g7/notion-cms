import React from "react";
import {
  BlockValues,
  CollectionContent,
  ImageBlockValues,
  Person,
} from "@notion-cms/types";

interface BlocksContextProps {
  blocks: (BlockValues | Person | CollectionContent)[];
  getImageUrl: (imageBlock: ImageBlockValues) => string;
}

const BlocksContext = React.createContext<BlocksContextProps>({
  blocks: [],
  getImageUrl: () => null,
});

export default BlocksContext;
