import React from "react";
import { Meta, Story } from "@storybook/react";
import { Block as BlockType } from "@notion-cms/types";

import DebugWrapper from "../Debug";
import { makeParagraph } from "./utils";
import Block from "../Block";

export default {
  title: "Dev tools/Debug",
  component: DebugWrapper,
} as Meta;

const Template: Story = ({ block }: { block: BlockType }) => {
  return (
    <DebugWrapper block={block}>
      <Block block={block} />
    </DebugWrapper>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  block: makeParagraph("Hey"),
};
