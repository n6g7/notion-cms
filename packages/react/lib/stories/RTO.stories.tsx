import React from "react";
import { Meta, Story } from "@storybook/react";
import { RichTextObject } from "@notion-cms/types";

import RTO from "../RTO";

export default {
  title: "Blocks/Rich text objects",
  component: RTO,
} as Meta;

const Template: Story = (args: { objects: RichTextObject[] }) => {
  return <RTO {...args} />;
};

export const PageMention = Template.bind({});
PageMention.args = {
  objects: [
    {
      type: "text",
      plain_text: "Check this out ",
      href: null,
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: "default",
      },
      text: { content: "Check this out ", link: null },
    },
    {
      type: "mention",
      plain_text: "My Page",
      href: null,
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: "default",
      },
      mention: {
        type: "page",
        page: {
          id: "",
        },
      },
    },
  ],
};

export const Annotations = Template.bind({});
Annotations.args = {
  objects: [
    {
      type: "text",
      plain_text: "I'm ",
      href: null,
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: "default",
      },
      text: { content: "I'm ", link: null },
    },
    {
      type: "text",
      plain_text: "bold",
      href: null,
      annotations: {
        bold: true,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: "default",
      },
      text: { content: "bold", link: null },
    },
    {
      type: "text",
      plain_text: ", ",
      href: null,
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: "default",
      },
      text: { content: ", ", link: null },
    },
    {
      type: "text",
      plain_text: "italic",
      href: null,
      annotations: {
        bold: false,
        italic: true,
        strikethrough: false,
        underline: false,
        code: false,
        color: "default",
      },
      text: { content: "italic", link: null },
    },
    {
      type: "text",
      plain_text: " and ",
      href: null,
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: "default",
      },
      text: { content: " and ", link: null },
    },
    {
      type: "text",
      plain_text: "more",
      href: null,
      annotations: {
        bold: false,
        italic: false,
        strikethrough: true,
        underline: true,
        code: false,
        color: "default",
      },
      text: { content: "more", link: null },
    },
    {
      type: "text",
      plain_text: ". I support ",
      href: null,
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: "default",
      },
      text: { content: ". I support ", link: null },
    },
    {
      type: "text",
      plain_text: "code",
      href: null,
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: true,
        color: "default",
      },
      text: { content: "code", link: null },
    },
    {
      type: "text",
      plain_text: " and ",
      href: null,
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: "default",
      },
      text: { content: " and ", link: null },
    },
    {
      type: "text",
      plain_text: "colours",
      href: null,
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: "red",
      },
      text: { content: "colours", link: null },
    },
    {
      type: "text",
      plain_text: " too.",
      href: null,
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: "default",
      },
      text: { content: " too.", link: null },
    },
  ],
};

export const Link = Template.bind({});
Link.args = {
  objects: [
    {
      type: "text",
      plain_text: "I support ",
      href: null,
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: "default",
      },
      text: { content: "I support ", link: null },
    },
    {
      type: "text",
      plain_text: "links",
      href: "https://github.com/n6g7/notion-cms",
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: "default",
      },
      text: {
        content: "links",
        link: { url: "https://github.com/n6g7/notion-cms" },
      },
    },
    {
      type: "text",
      plain_text: " too.",
      href: null,
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: "default",
      },
      text: { content: " too.", link: null },
    },
  ],
};
