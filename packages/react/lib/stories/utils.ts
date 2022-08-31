import { v4 as uuidv4 } from "uuid";
import {
  BaseBlock,
  BlockType,
  Heading1Block,
  Heading2Block,
  Heading3Block,
  ImageBlock,
  ParagraphBlock,
  RichTextObject,
} from "@notion-cms/types";

export const makeRTO = (text: string): RichTextObject[] => [
  {
    type: "text",
    plain_text: text,
    href: null,
    annotations: {
      bold: false,
      italic: false,
      strikethrough: false,
      underline: false,
      code: false,
      color: "default",
    },
    text: { content: text, link: null },
  },
];

export const makeBlock = <T extends BlockType>(type: T): BaseBlock<T> => ({
  id: uuidv4(),
  type,
  created_time: "",
  last_edited_time: "",
  has_children: false,
  archived: false,
});

export const makeParagraph = (text: string): ParagraphBlock => ({
  ...makeBlock("paragraph"),
  paragraph: {
    text: makeRTO(text),
  },
});

export const makeHeading = (
  level: 1 | 2 | 3,
  rto: RichTextObject[]
): Heading1Block | Heading2Block | Heading3Block => {
  const key = ("heading_" + level) as "heading_1" | "heading_2" | "heading_3";
  return {
    ...makeBlock(key),
    [key]: {
      text: rto,
    },
  } as Heading1Block | Heading2Block | Heading3Block;
};

export const makeImage = (
  url: string,
  name: string,
  caption: string
): ImageBlock => {
  return {
    ...makeBlock("image"),
    image: {
      type: "file",
      name,
      file: {
        url,
        expiry_time: "",
      },
      caption: makeRTO(caption),
    },
  };
};
