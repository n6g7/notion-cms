import React from "react";
import { Meta, Story } from "@storybook/react";
import { ParagraphBlock } from "@notion-cms/types";

import { makeBlock } from "./utils";
import Block from "../Block";

export default {
  title: "Blocks/Divider",
  component: Block,
} as Meta;

const Template: Story = ({ block }: { block: ParagraphBlock }) => {
  return <Block block={block} />;
};

export const Divider = Template.bind({});
Divider.args = {
  block: {
    ...makeBlock("divider"),
  },
};
