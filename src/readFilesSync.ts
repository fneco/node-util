import { readFileSync } from "fs";
import { piped } from "remeda";
import { relToAbs } from "./relToAbs";

export const readFilesSync = (
  files: string[],
  options?: {
    metaUrl?: string;
    encoding?: BufferEncoding;
  }
) => {
  const { encoding = "utf8", metaUrl } = options || {};

  const loadedFiles = files.map(
    piped(
      (f) => relToAbs(f, metaUrl),
      (f) => readFileSync(f, encoding)
    )
  );

  return loadedFiles;
};
