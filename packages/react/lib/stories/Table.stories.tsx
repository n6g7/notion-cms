import React from "react";
import { Meta, Story } from "@storybook/react";
import { TableBlock } from "@notion-cms/types";

import { makeBlock, makeRTO } from "./utils";
import Block from "../Block";

export default {
  title: "Blocks/Table",
  component: Block,
} as Meta;

const Template: Story = ({ block }: { block: TableBlock }) => {
  return <Block block={block} />;
};

export const Table = Template.bind({});
Table.args = {
  block: {
    ...makeBlock("table"),
    table: {
      has_column_header: true,
      has_row_header: true,
    },
    children: [
      {
        ...makeBlock("table_row"),
        table_row: {
          cells: [makeRTO("Cell 1"), makeRTO("Cell 2"), makeRTO("Cell 3")],
        },
      },
      {
        ...makeBlock("table_row"),
        table_row: {
          cells: [makeRTO("Cell 4"), makeRTO("Cell 5"), makeRTO("Cell 6")],
        },
      },
      {
        ...makeBlock("table_row"),
        table_row: {
          cells: [makeRTO("Cell 7"), makeRTO("Cell 8"), makeRTO("Cell 9")],
        },
      },
    ],
  },
};
