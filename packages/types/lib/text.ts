import { Color, URL } from "./base";

export type RichTextObject = {
  type: "text";
  text: {
    content: string;
    link: { url: URL } | null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: Color;
  };
  plain_text: string;
  href: URL | null;
};
