import React from "react";
import { BlockValues, ImageBlockValues, Person } from "@notion-cms/types";

interface BlocksContextProps {
  blocks: (BlockValues | Person)[];
  getImageUrl: (imageBlock: ImageBlockValues) => string;
}

const BlocksContext = React.createContext<BlocksContextProps>({
  blocks: [],
  getImageUrl: () => null,
});

export default BlocksContext;
