import { readFile } from "fs/promises";
import { piped } from "remeda";
import { relToAbs } from "./relToAbs";

export const readFiles =
  (metaUrl: string) =>
  async (
    files: string[],
    options?: {
      encoding?: BufferEncoding;
    }
  ) => {
    const { encoding = "utf8" } = options || {};

    const loadedFiles = await Promise.all(
      files.map(piped(relToAbs(metaUrl), (x) => readFile(x, encoding)))
    );

    return loadedFiles;
  };
