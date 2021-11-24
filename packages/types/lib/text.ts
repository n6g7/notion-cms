import { DateProperty, User, UUID } from ".";
import { Color, URL } from "./base";

type BaseRichTextObject = {
  type: "text" | "mention" | "equation";
  plain_text: string;
  href: URL | null;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: Color;
  };
};

export interface TextRTO extends BaseRichTextObject {
  type: "text";
  text: {
    content: string;
    link: { type?: "url"; url: URL } | null;
  };
}

interface BaseMention {
  type: "user" | "page" | "database" | "date" | "link_preview";
}
interface UserMention extends BaseMention {
  type: "user";
  user: User;
}
interface PageMention extends BaseMention {
  type: "page";
  page: { id: UUID };
}
interface DatabaseMention extends BaseMention {
  type: "database";
  database: { id: UUID };
}
interface DateMention extends BaseMention {
  type: "date";
  date: DateProperty["date"];
}
interface LinkPreviewMention extends BaseMention {
  type: "link_preview";
  link_preview: {
    url: URL;
  };
}
type MentionObject =
  | UserMention
  | PageMention
  | DatabaseMention
  | DateMention
  | LinkPreviewMention;
export interface MentionRTO extends BaseRichTextObject {
  type: "mention";
  mention: MentionObject;
}

export interface EquationRTO extends BaseRichTextObject {
  type: "equation";
  equation: {
    expression: string;
  };
}

export type RichTextObject = TextRTO | MentionRTO | EquationRTO;
