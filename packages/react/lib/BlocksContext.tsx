import React from "react";
import { BlockValues, Person } from "@notion-cms/types";

interface BlocksContextProps {
  blocks: (BlockValues | Person)[];
}

const BlocksContext = React.createContext<BlocksContextProps>({
  blocks: [],
});

export default BlocksContext;
