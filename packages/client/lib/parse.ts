import debug from "debug";
import {
  UserBlockValues,
  DataType,
  UUID,
  PageBlockValues,
} from "@notion-cms/types";
import { getRecordValues } from "./rpc";

const log = debug("notion-cms:parser");

export interface NotionUser {
  id: UUID;
  email: string;
  given_name: string;
  family_name: string;
  profile_photo: string | null;
}

export async function parseProperty(
  type: "checkbox",
  property: any,
  page: PageBlockValues,
  token: string
): Promise<boolean>;
export async function parseProperty(
  type: "number",
  property: any,
  page: PageBlockValues,
  token: string
): Promise<number>;
export async function parseProperty(
  type: "date",
  property: any,
  page: PageBlockValues,
  token: string
): Promise<Date>;
export async function parseProperty(
  type: "text" | "title" | "select",
  property: any,
  page: PageBlockValues,
  token: string
): Promise<string>;
export async function parseProperty(
  type: "multi_select" | "relation",
  property: any,
  page: PageBlockValues,
  token: string
): Promise<string[]>;
export async function parseProperty(
  type: "person",
  property: any,
  page: PageBlockValues,
  token: string
): Promise<NotionUser[]>;
export async function parseProperty(
  type: DataType,
  property: any,
  page: PageBlockValues,
  token: string
) {
  if (!property) return null;

  switch (type) {
    case "checkbox":
      if (!property) return false;
      return property[0][0] === "Yes";
    case "number":
      return parseFloat(property[0][0]);
    case "date":
      const { type: dateType, start_date, start_time } = property[0][1][0][1];
      switch (dateType) {
        case "date":
          return new Date(start_date).toISOString();
        case "datetime":
          return new Date(`${start_date}T${start_time}`).toISOString();
      }
    case "created_time":
      return new Date(page.created_time).toISOString();
    case "person":
      return await Promise.all(
        property
          .filter((p: any, i: number) => i % 2 === 0)
          .map(async (p: any) => {
            const {
              value: { id, email, given_name, family_name, profile_photo },
            } = await getRecordValues<UserBlockValues>(
              {
                table: "notion_user",
                id: p[1][0][1],
              },
              token
            );
            return {
              id,
              email,
              given_name,
              family_name,
              profile_photo: profile_photo || null,
            };
          })
      );
    case "text":
    case "title":
    case "select":
      return property[0][0];
    case "multi_select":
      return property[0][0].split(",");
    case "relation":
      // log(property);
      // log(
      //   property
      //     .filter((_: any, i: number) => i % 2 === 0)
      //     .map((x: any) => x[1])
      // );
      return property
        .filter((_: any, i: number) => i % 2 === 0)
        .map((x: any) => x[1][0][1]);
    default:
      log("Unknown type %s: %o", type, property);
      return property;
  }
}
