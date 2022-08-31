import {
  Color,
  ISO8601Date,
  PropertyType,
  RollupFunction,
  URL,
  UUID,
} from "./base";
import { ExternalFileObject, NotionFileObject, User } from "./objects";
import { RichTextObject } from "./text";

interface BaseProperty<T extends PropertyType> {
  type?: T;
  id: string;
}

// DATABASE

export interface TitleProperty extends BaseProperty<"title"> {
  title?: RichTextObject[];
}

export interface RichTextProperty extends BaseProperty<"rich_text"> {
  rich_text?: RichTextObject[];
}

export interface NumberProperty extends BaseProperty<"number"> {
  number?: number;
}

export interface SelectProperty extends BaseProperty<"select"> {
  select?: {
    id: UUID;
    name: string;
    color: Color;
  } | null;
}

export interface MultiSelectProperty extends BaseProperty<"multi_select"> {
  multi_select?: {
    id: UUID;
    name: string;
    color: Color;
  }[];
}

export interface DateProperty extends BaseProperty<"date"> {
  date?: {
    start: ISO8601Date;
    end: ISO8601Date | null;
  } | null;
}

interface BaseFormulaValue {
  type: "string" | "number" | "boolean" | "date";
}
interface StringFormulaValue extends BaseFormulaValue {
  type: "string";
  string: string | null;
}
interface NumberFormulaValue extends BaseFormulaValue {
  type: "number";
  number: number | null;
}
interface BooleanFormulaValue extends BaseFormulaValue {
  type: "boolean";
  boolean: boolean | null;
}
interface DateFormulaValue extends BaseFormulaValue {
  type: "date";
  date: DateProperty["date"] | null;
}
type FormulaValue =
  | StringFormulaValue
  | NumberFormulaValue
  | BooleanFormulaValue
  | DateFormulaValue;
export interface FormulaProperty extends BaseProperty<"formula"> {
  formula?: FormulaValue;
}

export interface RelationProperty extends BaseProperty<"relation"> {
  relation?: { id: UUID }[];
}

interface BaseRollupValue {
  type: "number" | "date" | "array" | "unsupported";
}
interface NumberRollupValue extends BaseRollupValue {
  type: "number";
  number: number | null;
  function: RollupFunction;
}
interface DateRollupValue extends BaseRollupValue {
  type: "date";
  date: DateProperty["date"] | null;
  function: RollupFunction;
}
interface ArrayRollupValue extends BaseRollupValue {
  type: "array";
  array: (
    | {
        type: "formula";
        formula:
          | {
              type: "string";
              string: string | null;
            }
          | {
              type: "date";
              date: {
                start: string;
                end: string | null;
              } | null;
            }
          | {
              type: "number";
              number: number | null;
            }
          | {
              type: "boolean";
              boolean: boolean | null;
            };
      }
    | any
  )[];
  function: RollupFunction;
}
interface UnsupportedRollupValue extends BaseRollupValue {
  type: "unsupported";
  unsupported: Record<string, never>;
  function: RollupFunction;
}
type RollupValue =
  | NumberRollupValue
  | DateRollupValue
  | ArrayRollupValue
  | UnsupportedRollupValue;
export interface RollupProperty extends BaseProperty<"rollup"> {
  rollup?: RollupValue;
}

export interface PeopleProperty extends BaseProperty<"people"> {
  people?: User[];
}

interface NotionFileReference extends NotionFileObject {
  name: string;
}
interface ExternalFileReference extends ExternalFileObject {
  name: string;
}
type FileReference = NotionFileReference | ExternalFileReference;
export interface FilesProperty extends BaseProperty<"files"> {
  files?: FileReference[];
}

export interface CheckboxProperty extends BaseProperty<"checkbox"> {
  checkbox?: boolean;
}

export interface URLProperty extends BaseProperty<"url"> {
  url?: URL | null;
}

export interface EmailProperty extends BaseProperty<"email"> {
  email?: string | null;
}

export interface PhoneNumberProperty extends BaseProperty<"phone_number"> {
  phone_number?: string | null;
}

export interface CreatedTimeProperty extends BaseProperty<"created_time"> {
  created_time?: ISO8601Date;
}

export interface CreatedByProperty extends BaseProperty<"created_by"> {
  created_by?: User;
}

export interface LastEditedTimeProperty
  extends BaseProperty<"last_edited_time"> {
  last_edited_time?: ISO8601Date;
}

export interface LastEditedByProperty extends BaseProperty<"last_edited_by"> {
  last_edited_by?: User;
}

export type Property =
  | TitleProperty
  | RichTextProperty
  | NumberProperty
  | SelectProperty
  | MultiSelectProperty
  | DateProperty
  | FormulaProperty
  | RelationProperty
  | RollupProperty
  | PeopleProperty
  | FilesProperty
  | CheckboxProperty
  | URLProperty
  | EmailProperty
  | PhoneNumberProperty
  | CreatedTimeProperty
  | CreatedByProperty
  | LastEditedTimeProperty
  | LastEditedByProperty;
