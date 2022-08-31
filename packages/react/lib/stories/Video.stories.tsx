import React from "react";
import { Meta, Story } from "@storybook/react";
import { VideoBlock } from "@notion-cms/types";

import { makeBlock } from "./utils";
import Block from "../Block";

export default {
  title: "Blocks/Video",
  component: Block,
} as Meta;

const Template: Story = ({ block }: { block: VideoBlock }) => {
  return <Block block={block} />;
};

export const Youtube = Template.bind({});
Youtube.args = {
  block: {
    ...makeBlock("video"),
    video: {
      type: "external",
      external: {
        url: "https://www.youtube.com/watch?v=67kItGjvRs0",
      },
    },
  },
};
