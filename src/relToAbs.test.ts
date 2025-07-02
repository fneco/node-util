import { resolve } from "path";
import { describe, expect, it } from "vitest";
import { relToAbs } from "./relToAbs";

const fileUrl = import.meta.url;
const __dirname = import.meta.dirname;

describe("relToAbs.abs", () => {
  it("should resolve a relative path to absolute using abs", () => {
    const abs = relToAbs.curried(fileUrl);
    const rel = "../test.txt";
    const expected = resolve(__dirname, rel);
    expect(abs(rel)).toBe(expected);
  });

  it("should resolve with additional paths using abs", () => {
    const abs = relToAbs.curried(fileUrl, ["foo", "bar"]);
    const rel = "baz.txt";
    const expected = resolve(__dirname, "foo", "bar", rel);
    expect(abs(rel)).toBe(expected);
  });

  it("should return path as is if fileUrl is not provided (undefined)", () => {
    const abs = relToAbs.curried();
    const rel = "some/relative/path.txt";
    expect(abs(rel)).toBe(rel);
  });
});
