import React from "react";
import { Meta, Story } from "@storybook/react";
import { BookmarkBlock } from "@notion-cms/types";

import BookmarkComp from "../components/Bookmark";
import { makeRTO } from "./utils";

export default {
  title: "Blocks/Bookmark",
  component: BookmarkComp,
} as Meta;

const Template: React.FC = (args: { block: BookmarkBlock }) => (
  <BookmarkComp {...args} />
);

const storyBlock: BookmarkBlock = {
  id: "123",
  type: "bookmark",
  created_time: "",
  last_edited_time: "",
  has_children: false,
  archived: false,
  bookmark: {
    url: "https://github.com/n6g7/notion-cms",
    caption: makeRTO("notion-cms's GitHub page"),
  },
};

export const Bookmark: Story = Template.bind({});
Bookmark.args = {
  block: storyBlock,
};
