import { existsSync, readFileSync, rmSync } from "fs";
import { join } from "path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { makeDirFileSync } from "./makeDirFileSync";

const TEST_DIR = join(__dirname, "__test_output__");
const TEST_FILE = join(TEST_DIR, "test.txt");

function cleanup() {
  if (existsSync(TEST_DIR)) {
    rmSync(TEST_DIR, { recursive: true, force: true });
  }
}

describe("makeDirFileSync", () => {
  beforeEach(() => {
    cleanup();
  });
  afterEach(() => {
    cleanup();
  });

  it("creates a directory at the specified path and writes a file", () => {
    console.log({ TEST_FILE });
    makeDirFileSync({ filePath: TEST_FILE, content: "hello" }, {});
    expect(existsSync(TEST_FILE)).toBe(true);
    expect(readFileSync(TEST_FILE, "utf8")).toBe("hello");
  });

  it("creates an empty file if content is not specified", () => {
    makeDirFileSync({ filePath: TEST_FILE }, {});
    expect(existsSync(TEST_FILE)).toBe(true);
    expect(readFileSync(TEST_FILE, "utf8")).toBe("");
  });

  it("works as a curried function", () => {
    const fn = makeDirFileSync({});
    fn({ filePath: TEST_FILE, content: "curry" });
    expect(existsSync(TEST_FILE)).toBe(true);
    expect(readFileSync(TEST_FILE, "utf8")).toBe("curry");
  });

  it("applies the encoding option", () => {
    makeDirFileSync(
      { filePath: TEST_FILE, content: "あいうえお" },
      { encoding: "utf16le" }
    );
    expect(readFileSync(TEST_FILE, "utf16le")).toBe("あいうえお");
  });
});
