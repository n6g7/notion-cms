import React from "react";
import { Meta, Story } from "@storybook/react";
import { RichTextObject } from "@notion-cms/types";

import { makeHeading, makeRTO } from "./utils";
import Block from "../Block";

export default {
  title: "Blocks/Heading",
  component: Block,
} as Meta;

const Template: Story = ({
  text,
  level,
}: {
  text: RichTextObject[];
  level: 1 | 2 | 3;
}) => {
  const block = makeHeading(level, text);
  return <Block block={block} />;
};

export const Heading1 = Template.bind({});
Heading1.args = {
  level: 1,
  text: makeRTO("Level 1"),
};
export const Heading2 = Template.bind({});
Heading2.args = {
  level: 2,
  text: makeRTO("Level 2"),
};
export const Heading3 = Template.bind({});
Heading3.args = {
  level: 3,
  text: makeRTO("Level 3"),
};
