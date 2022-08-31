import React from "react";

import RTO from "../RTO";
import NotionLinkComp from "../components/NotionLink";
import { makeRTO } from "./utils";

export default {
  title: "Blocks/NotionLink",
  component: NotionLinkComp,
};

const Template = (args: { pageId: string }) => (
  <NotionLinkComp {...args}>
    <RTO objects={makeRTO("Hello world")} />
  </NotionLinkComp>
);

export const NotionLink = Template.bind({});
NotionLink.args = {
  pageId: "b55c9c91-384d-452b-81db-d1ef79372b75",
};
