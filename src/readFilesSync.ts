import { readFileSync } from "fs";
import { piped } from "remeda";
import { relToAbs } from "./relToAbs";

export const readFilesSync =
  (metaUrl: string) =>
  (
    files: string[],
    options?: {
      encoding?: BufferEncoding;
    }
  ) => {
    const { encoding = "utf8" } = options || {};

    const loadedFiles = files.map(
      piped(relToAbs(metaUrl), (x) => readFileSync(x, encoding))
    );

    return loadedFiles;
  };
