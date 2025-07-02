import { mkdirSync, writeFileSync } from "fs";
import { dirname } from "path";
import { relToAbs } from "./relToAbs";

export const makeDirFileSync = (
  data: { filePath: string; content?: string },
  options?: { metaUrl?: string; encoding?: BufferEncoding }
) => {
  const { metaUrl, encoding = "utf8" } = options ?? {};
  const absFilePath = metaUrl
    ? relToAbs(data.filePath, metaUrl)
    : data.filePath;
  const dir = dirname(absFilePath);
  mkdirSync(dir, { recursive: true });
  writeFileSync(absFilePath, data.content ?? "", encoding);
};
