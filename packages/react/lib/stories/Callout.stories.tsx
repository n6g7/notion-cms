import React from "react";
import { Color, EmojiObject, FileObject } from "@notion-cms/types";

import RTO from "../RTO";
import CalloutComp from "../components/Callout";
import { makeRTO } from "./utils";

export default {
  title: "Blocks/Callout",
  component: CalloutComp,
};

const icon: FileObject | EmojiObject = {
  type: "emoji",
  emoji: "❤️",
};

const Template = (args: { icon: FileObject | EmojiObject; color: Color }) => (
  <CalloutComp {...args}>
    <RTO objects={makeRTO("Hello world")} />
  </CalloutComp>
);

export const Callout = Template.bind({});
Callout.args = {
  icon,
};
