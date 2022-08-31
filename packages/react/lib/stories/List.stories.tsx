import React from "react";
import { Meta, Story } from "@storybook/react";
import { ParagraphBlock } from "@notion-cms/types";

import { makeBlock, makeRTO } from "./utils";
import Block from "../Block";

export default {
  title: "Blocks/List",
  component: Block,
} as Meta;

const Template: Story = ({ block }: { block: ParagraphBlock }) => {
  return <Block block={block} />;
};

export const Bulleted = Template.bind({});
Bulleted.args = {
  block: {
    ...makeBlock("bulleted_list_item"),
    bulleted_list_item: {
      text: makeRTO("Content"),
    },
  },
};

export const Numbered = Template.bind({});
Numbered.args = {
  block: {
    ...makeBlock("numbered_list_item"),
    numbered_list_item: {
      text: makeRTO("Content"),
    },
  },
};

export const WithChildren = Template.bind({});
WithChildren.args = {
  block: {
    ...makeBlock("bulleted_list_item"),
    bulleted_list_item: {
      text: makeRTO("Content"),
    },
    has_children: true,
    children: [
      {
        ...makeBlock("bulleted_list_item"),
        bulleted_list_item: {
          text: makeRTO("Sub-content 1"),
        },
      },
      {
        ...makeBlock("bulleted_list_item"),
        bulleted_list_item: {
          text: makeRTO("Sub-content 2"),
        },
      },
    ],
  },
};
