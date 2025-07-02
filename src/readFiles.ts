import { readFile } from "fs/promises";
import { piped } from "remeda";
import { relToAbs } from "./relToAbs";

export const readFiles = async (
  files: string[],
  options?: {
    metaUrl?: string;
    encoding?: BufferEncoding;
  }
) => {
  const { encoding = "utf8", metaUrl } = options || {};

  const loadedFiles = await Promise.all(
    files.map(
      piped(
        (f) => relToAbs(f, metaUrl),
        (f) => readFile(f, encoding)
      )
    )
  );

  return loadedFiles;
};
