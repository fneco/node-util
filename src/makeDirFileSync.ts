import { mkdirSync, writeFileSync } from "fs";
import { dirname } from "path";
import { purry } from "remeda";
import { relToAbs } from "./relToAbs";

const _makeDirFileSync = (
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

export function makeDirFileSync(
  data: { filePath: string; content?: string },
  option?: { metaUrl?: string; encoding?: BufferEncoding }
): void;

export function makeDirFileSync(option?: {
  metaUrl?: string;
  encoding?: BufferEncoding;
}): (data: { filePath: string; content?: string }) => void;

export function makeDirFileSync(...args: unknown[]) {
  return purry(_makeDirFileSync, args);
}
