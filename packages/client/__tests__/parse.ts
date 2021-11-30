const { parseProperty } = require("../lib/parse");

describe("parseProperty", () => {
  describe("rich_text", () => {
    it("concatenates strings", async () => {
      const res = await parseProperty(
        {
          id: "123",
          type: "rich_text",
          rich_text: [{ plain_text: "aze" }, { plain_text: "rty" }],
        },
        null
      );
      expect(res).toEqual("azerty");
    });

    it("returns an empty string for empty array", async () => {
      const res = await parseProperty(
        { id: "123", type: "rich_text", rich_text: [] },
        null
      );
      expect(res).toEqual("");
    });
  });

  describe("number", () => {
    it("returns the right value", async () => {
      const res = await parseProperty(
        {
          id: "123",
          type: "number",
          number: 12,
        },
        null
      );
      expect(res).toEqual(12);
    });

    it("doesn't return undefined", async () => {
      const res = await parseProperty(
        { id: "123", type: "number", number: null },
        null
      );
      expect(res).toEqual(null);
    });
  });

  describe("select", () => {
    it("returns a string", async () => {
      const res = await parseProperty(
        { id: "123", type: "select", select: { name: "aze" } },
        null
      );
      expect(res).toEqual("aze");
    });

    it("doesn't return undefined", async () => {
      const res = await parseProperty(
        { id: "123", type: "select", select: null },
        null
      );
      expect(res).toEqual(null);
    });
  });

  describe("multi_select", () => {
    it("returns an array of values", async () => {
      const res = await parseProperty(
        {
          id: "123",
          type: "multi_select",
          multi_select: [{ name: "aze" }, { name: "rty" }],
        },
        null
      );
      expect(res).toEqual(["aze", "rty"]);
    });

    it("returns an empty array when none selected", async () => {
      const res = await parseProperty(
        { id: "123", type: "multi_select", multi_select: [] },
        null
      );
      expect(res).toEqual([]);
    });
  });
});
