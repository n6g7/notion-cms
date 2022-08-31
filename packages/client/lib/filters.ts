import { ISO8601Date, PropertyType, UUID } from "@notion-cms/types";
import { Subtract } from "./arithmetic";

// FILTER CONDITIONS

type DateFilterCondition =
  | { equals: ISO8601Date }
  | { before: ISO8601Date }
  | { after: ISO8601Date }
  | { on_or_before: ISO8601Date }
  | { on_or_after: ISO8601Date }
  | { is_empty: true }
  | { is_not_empty: true }
  | { past_week: Record<string, never> }
  | { past_month: Record<string, never> }
  | { past_year: Record<string, never> }
  | { next_week: Record<string, never> }
  | { next_month: Record<string, never> }
  | { next_year: Record<string, never> };

type TextFilterCondition =
  | { equals: string }
  | { does_not_equal: string }
  | { contains: string }
  | { does_not_contain: string }
  | { starts_with: string }
  | { ends_with: string }
  | { is_empty: true }
  | { is_not_empty: true };

type NumberFilterCondition =
  | { equals: number }
  | { does_not_equal: number }
  | { greater_than: number }
  | { less_than: number }
  | { greater_than_or_equal_to: number }
  | { less_than_or_equal_to: number }
  | { is_empty: true }
  | { is_not_empty: true };

type CheckboxFilterCondition =
  | { equals: boolean }
  | { does_not_equal: boolean };

type SelectFilterCondition =
  | { equals: string }
  | { does_not_equal: string }
  | { is_empty: true }
  | { is_not_empty: true };

type MultiSelectFilterCondition =
  | { contains: string }
  | { does_not_contain: string }
  | { is_empty: true }
  | { is_not_empty: true };

type PeopleFilterCondition =
  | { contains: UUID }
  | { does_not_contain: UUID }
  | { is_empty: true }
  | { is_not_empty: true };

type FilesFilterCondition = { is_empty: true } | { is_not_empty: true };

type RelationFilterCondition =
  | { contains: UUID }
  | { does_not_contain: UUID }
  | { is_empty: true }
  | { is_not_empty: true };

type NestedRollupFilters =
  | TextFilter
  | NumberFilter
  | CheckboxFilter
  | SelectFilter
  | MultiSelectFilter
  | RelationFilter
  | DateFilter
  | PeopleFilter
  | FilesFilter;

type RollupFilterCondition =
  | { any: NestedRollupFilters }
  | { every: NestedRollupFilters }
  | { none: NestedRollupFilters }
  | { number: NumberFilterCondition }
  | { date: DateFilterCondition };

type FormulaFilterCondition =
  | { text: TextFilterCondition }
  | { checkbox: CheckboxFilterCondition }
  | { number: NumberFilterCondition }
  | { date: DateFilterCondition };

// FILTERS

interface TimestampFilter<T extends "created_time" | "last_edited_time"> {
  timestamp: T;
  property: T;
}

interface CreatedTimeFilter extends TimestampFilter<"created_time"> {
  created_time: DateFilterCondition;
}

interface LastEditedTimeFilter extends TimestampFilter<"last_edited_time"> {
  last_edited_time: DateFilterCondition;
}

interface PropertyFilter<T extends PropertyType | "text"> {
  property: string;
  type?: T;
}

// Weird special value used by rollup
interface TextFilter extends PropertyFilter<"text"> {
  text: TextFilterCondition;
}

interface RichTextFilter extends PropertyFilter<"rich_text"> {
  rich_text: TextFilterCondition;
}

interface TitleFilter extends PropertyFilter<"title"> {
  title: TextFilterCondition;
}

interface UrlFilter extends PropertyFilter<"url"> {
  url: TextFilterCondition;
}

interface EmailFilter extends PropertyFilter<"email"> {
  email: TextFilterCondition;
}

interface PhoneNumberFilter extends PropertyFilter<"phone_number"> {
  phone_number: TextFilterCondition;
}

interface NumberFilter extends PropertyFilter<"number"> {
  number: NumberFilterCondition;
}

interface CheckboxFilter extends PropertyFilter<"checkbox"> {
  checkbox: CheckboxFilterCondition;
}

interface SelectFilter extends PropertyFilter<"select"> {
  select: SelectFilterCondition;
}

interface MultiSelectFilter extends PropertyFilter<"multi_select"> {
  multi_select: MultiSelectFilterCondition;
}

interface DateFilter extends PropertyFilter<"date"> {
  date: DateFilterCondition;
}

interface PeopleFilter extends PropertyFilter<"people"> {
  people: PeopleFilterCondition;
}

interface CreatedByFilter extends PropertyFilter<"created_by"> {
  created_by: PeopleFilterCondition;
}

interface LastEditedByFilter extends PropertyFilter<"last_edited_by"> {
  last_edited_by: PeopleFilterCondition;
}

interface FilesFilter extends PropertyFilter<"files"> {
  files: FilesFilterCondition;
}

interface RelationFilter extends PropertyFilter<"relation"> {
  relation: RelationFilterCondition;
}

interface RollupFilter extends PropertyFilter<"rollup"> {
  rollup: RollupFilterCondition;
}

interface FormulaFilter extends PropertyFilter<"formula"> {
  formula: FormulaFilterCondition;
}

export type AtomicFilter =
  | CreatedTimeFilter
  | LastEditedTimeFilter
  | RichTextFilter
  | TitleFilter
  | UrlFilter
  | EmailFilter
  | PhoneNumberFilter
  | NumberFilter
  | CheckboxFilter
  | SelectFilter
  | MultiSelectFilter
  | DateFilter
  | PeopleFilter
  | CreatedByFilter
  | LastEditedByFilter
  | FilesFilter
  | RelationFilter
  | RollupFilter
  | FormulaFilter;

// COMPOUND FILTERS

type ConnectiveType = "and" | "or";
// Only support two levels of depth
type Connective<C extends ConnectiveType, D extends number = 1> = {
  [x in C]: D extends 0
    ? AtomicFilter[]
    : (AtomicFilter | Connective<Exclude<ConnectiveType, C>, Subtract<D, 1>>)[];
};

type ConjunctionFilter = Connective<"and">;
type DisjunctionFilter = Connective<"or">;

type CompoundFiler = ConjunctionFilter | DisjunctionFilter;

export type Filter = AtomicFilter | CompoundFiler;
