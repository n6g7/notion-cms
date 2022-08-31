import React from "react";
import { Meta, Story } from "@storybook/react";
import { ParagraphBlock } from "@notion-cms/types";

import { makeParagraph } from "./utils";
import Block from "../Block";

export default {
  title: "Blocks/Paragraph",
  component: Block,
} as Meta;

const Template: Story = ({ block }: { block: ParagraphBlock }) => {
  return <Block block={block} />;
};

export const Paragraph = Template.bind({});
Paragraph.args = {
  block: makeParagraph("Some text"),
};
