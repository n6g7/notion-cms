import React from "react";
import { Meta, Story } from "@storybook/react";
import { ParagraphBlock } from "@notion-cms/types";

import { makeImage } from "./utils";
import Block from "../Block";

export default {
  title: "Blocks/Image",
  component: Block,
} as Meta;

const Template: Story = ({ block }: { block: ParagraphBlock }) => {
  return <Block block={block} />;
};

export const Image = Template.bind({});
Image.args = {
  block: makeImage(
    "https://www.notion.so/cdn-cgi/image/format=auto,width=640,quality=100/front-static/pages/product/work-life-campaign/fr-FR.png",
    "Some text",
    "Some caption"
  ),
};
