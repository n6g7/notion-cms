import React from "react";
import { Meta, Story } from "@storybook/react";
import { CodeBlock } from "@notion-cms/types";

import { makeBlock, makeRTO } from "./utils";
import Block from "../Block";

export default {
  title: "Blocks/Code",
  component: Block,
} as Meta;

const Template: Story = ({ block }: { block: CodeBlock }) => {
  return <Block block={block} />;
};

export const Shell = Template.bind({});
Shell.args = {
  block: {
    ...makeBlock("code"),
    code: {
      rich_text: makeRTO("# yum install apache"),
      language: "shell",
    },
  },
};

export const Javascript = Template.bind({});
Javascript.args = {
  block: {
    ...makeBlock("code"),
    code: {
      rich_text: makeRTO(
        `const regexp = /^https?:\\\/\\\/([a-z0-9-.]+)\\\/$/;\n"https://notion-cms.js.org/".match(regexp);`
      ),
      language: "javascript",
    },
  },
};
