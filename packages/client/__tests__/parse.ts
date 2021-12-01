import { User } from "@notion-cms/types";
import { parseProperty } from "../lib/parse";

describe("parseProperty", () => {
  describe("rich_text", () => {
    it("concatenates strings", async () => {
      const res = await parseProperty({
        id: "123",
        type: "rich_text",
        rich_text: [
          {
            plain_text: "aze",
            type: "text",
            text: null,
            href: null,
            annotations: {
              bold: false,
              italic: false,
              code: false,
              strikethrough: false,
              underline: false,
              color: "default",
            },
          },
          {
            plain_text: "rty",
            type: "text",
            text: null,
            href: null,
            annotations: {
              bold: false,
              italic: false,
              code: false,
              strikethrough: false,
              underline: false,
              color: "default",
            },
          },
        ],
      });
      expect(res).toEqual("azerty");
    });

    it("returns an empty string for empty array", async () => {
      const res = await parseProperty({
        id: "123",
        type: "rich_text",
        rich_text: [],
      });
      expect(res).toEqual("");
    });
  });

  describe("number", () => {
    it("returns the right value", async () => {
      const res = await parseProperty({
        id: "123",
        type: "number",
        number: 12,
      });
      expect(res).toEqual(12);
    });

    it("doesn't return undefined", async () => {
      const res = await parseProperty({
        id: "123",
        type: "number",
        number: null,
      });
      expect(res).toEqual(null);
    });
  });

  describe("select", () => {
    it("returns a string", async () => {
      const res = await parseProperty({
        id: "123",
        type: "select",
        select: { name: "aze", id: "", color: "default" },
      });
      expect(res).toEqual("aze");
    });

    it("doesn't return undefined", async () => {
      const res = await parseProperty({
        id: "123",
        type: "select",
        select: null,
      });
      expect(res).toEqual(null);
    });
  });

  describe("multi_select", () => {
    it("returns an array of values", async () => {
      const res = await parseProperty({
        id: "123",
        type: "multi_select",
        multi_select: [
          { name: "aze", id: "", color: "default" },
          { name: "rty", id: "", color: "default" },
        ],
      });
      expect(res).toEqual(["aze", "rty"]);
    });

    it("returns an empty array when none selected", async () => {
      const res = await parseProperty({
        id: "123",
        type: "multi_select",
        multi_select: [],
      });
      expect(res).toEqual([]);
    });
  });

  describe("people", () => {
    it("returns an array of users", async () => {
      const user: User = {
        object: "user",
        id: "11ff89e5-6525-4680-83b1-5678abcd1234",
        name: "Bruce Wayne",
        avatar_url: null,
        type: "person",
        person: {
          email: "bruce@wayneindustries.com",
        },
      };
      const res = await parseProperty({
        id: "123",
        type: "people",
        people: [user],
      });
      expect(res).toEqual([user]);
    });

    it("returns an empty array when none selected", async () => {
      const res = await parseProperty({
        id: "123",
        type: "people",
        people: [],
      });
      expect(res).toEqual([]);
    });
  });

  describe("rollup", () => {
    it("supports numbers", async () => {
      const res = await parseProperty({
        id: "123",
        type: "rollup",
        rollup: {
          type: "number",
          number: 12,
          function: "checked",
        },
      });
      expect(res).toEqual(12);
    });
  });
});
