import { compare2Files } from "@/compare2Files";
import { deleteFiles } from "@/deleteFiles";
import { makeDirFileSync } from "@/makeDirFileSync";
import { moveFile } from "@/moveFile";
import { readConvertWrite } from "@/readConvertWrite";
import { relToAbs } from "@/relToAbs";
import * as fs from "fs/promises";
import { afterAll, describe, expect, test } from "vitest";

const opt = { metaUrl: import.meta.url };
const abs = relToAbs(opt.metaUrl);

describe("integration", async () => {
  const make = makeDirFileSync(opt);
  test("makeDirFileSync", () => {
    make({ filePath: `./tmp/foo.txt`, content: "foo" });
  });

  const rcw = readConvertWrite(opt);
  test("readConvertWrite", () => {
    rcw({
      converter: (x) => x,
      inFile: "./tmp/foo.txt",
      outFile: `./tmp/copy/foo.txt`,
    });
    rcw({
      converter: () => "bar",
      inFile: "./tmp/foo.txt",
      outFile: `./tmp/bar.txt`,
    });
  });

  const isEqualContent = compare2Files(opt);
  test("compare2Files", async () => {
    expect(await isEqualContent(["./tmp/foo.txt", "./tmp/copy/foo.txt"])).toBe(
      true
    );
    expect(await isEqualContent(["./tmp/foo.txt", "./tmp/bar.txt"])).toBe(
      false
    );
  });

  const move = moveFile(opt.metaUrl);
  test("moveFile", () => {
    move({ from: `./tmp/copy/foo.txt`, to: "./tmp/foo2.txt" });
  });

  test("deleteFiles", async () => {
    const del = deleteFiles(opt.metaUrl);
    await del({ dirPath: "./tmp", shouldDelete: (x) => x.includes("foo") });
    await expect(fs.access(abs("./tmp/bar.txt"))).resolves.toBeUndefined();
    await expect(fs.access(abs("./tmp/foo.txt"))).rejects.toThrow();
    await expect(fs.access(abs("./tmp/foo2.txt"))).rejects.toThrow();
    await expect(fs.access(abs("./tmp/copy/foo.txt"))).rejects.toThrow();
  });

  afterAll(async () => {
    await fs.rm(abs("./tmp"), { recursive: true, force: true });
  });
});
