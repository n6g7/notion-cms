import debug from "debug";
import { Page, Property, RichTextObject, ISO8601Date } from "@notion-cms/types";
import _ from "lodash";
import { DatabaseProps, ParsedPage } from "./types";

const log = debug("notion-cms:parser");

function parseRichText(value: RichTextObject[]) {
  return value.reduce((acc, text) => acc + text.plain_text, "");
}

function parseDate(value: ISO8601Date) {
  return new Date(value).toISOString();
}

export async function parseProperty(
  property: Property
): Promise<DatabaseProps[string]> {
  switch (property.type) {
    case "rich_text":
      return parseRichText(property.rich_text);

    case "number":
      return property.number;

    case "select":
      return property.select?.name || null;

    case "multi_select":
      return property.multi_select.map((x) => x.name);

    case "date":
      if (property.date.end)
        return {
          start: parseDate(property.date.start),
          end: parseDate(property.date.end),
        };
      else return parseDate(property.date.start);

    case "formula":
      switch (property.formula.type) {
        case "boolean":
          return property.formula.boolean;
        case "date":
          if (property.formula.date.end)
            return {
              start: parseDate(property.formula.date.start),
              end: parseDate(property.formula.date.end),
            };
          else return parseDate(property.formula.date.start);
        case "number":
          return property.formula.number;
        case "string":
          return property.formula.string;
        default:
          log(
            "Unknown formula type %s: %o",
            (property.formula as any).type,
            property.formula
          );
          return null;
      }

    case "relation":
      return property.relation.map((rel) => rel.id);

    case "rollup":
      switch (property.rollup.type) {
        case "number":
          return property.rollup.number;
        case "array":
          return property.rollup.array.map((x) => {
            switch (x.type) {
              case "formula":
                switch (x.formula.type) {
                  case "string":
                    return x.formula.string;
                  case "date":
                    if (x.formula.date.end)
                      return {
                        start: parseDate(x.formula.date.start),
                        end: parseDate(x.formula.date.end),
                      };
                    else return parseDate(x.formula.date.start);
                  case "number":
                    return x.formula.number;
                  case "boolean":
                    return x.formula.boolean;
                  default:
                    log(
                      "Unknown rollup > array > formula type %s: %o",
                      x.formula.type,
                      x.formula
                    );
                    return null;
                }
              default:
                log("Unknown rollup array item type %s: %o", x.type, x);
                return null;
            }
          });
        default:
          log(
            "Unknown rollup type %s: %o",
            (property.rollup as any).type,
            property.rollup
          );
          return null;
      }

    case "title":
      return parseRichText(property.title);

    case "people":
      return property.people;

    case "files":
      return property;

    case "checkbox":
      return property.checkbox;

    case "url":
      return property.url;

    case "email":
      return property.email;

    case "phone_number":
      return property.phone_number;

    case "created_time":
      return parseDate(property.created_time);

    case "last_edited_time":
      return parseDate(property.last_edited_time);

    default:
      log("Unknown type %s: %o", (property as any).type, property);
      return null;
  }
}

export async function parsePage<T extends DatabaseProps>(
  page: Page
): Promise<ParsedPage<T>> {
  const props = await Promise.all(
    Object.keys(page.properties).map(async (key) => ({
      [key]: await parseProperty(page.properties[key] as any),
    }))
  );

  return {
    id: page.id,
    meta: {
      icon: page.icon
        ? "emoji" in page.icon
          ? page.icon.emoji
          : page.icon.type == "file"
          ? page.icon.file.url
          : page.icon.external.url
        : null,
      cover: page.cover
        ? page.cover.type === "file"
          ? page.cover.file.url
          : page.cover.external.url
        : null,
    },
    props: _.merge({}, ...props),
  };
}
