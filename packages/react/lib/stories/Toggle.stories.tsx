import React from "react";
import { Meta, Story } from "@storybook/react";

import ToggleComp from "../components/Toggle";
import { makeParagraph, makeRTO } from "./utils";

export default {
  title: "Blocks/Toggle",
  component: ToggleComp,
} as Meta;

const Template: Story = ({ title }: { title: string }) => {
  return (
    <ToggleComp
      title={makeRTO(title)}
      content={[makeParagraph("Hello world")]}
    ></ToggleComp>
  );
};

export const Toggle = Template.bind({});
Toggle.args = {
  title: "Toggle me",
};
