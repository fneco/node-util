import { purry } from "remeda";
import { readFiles } from "./readFiles";

type IsEqual = (a: string, b: string) => boolean;

export const _compare2Files = async (
  files: [string, string],
  options: {
    metaUrl: string;
    encoding?: BufferEncoding;
  },
  isEqual: IsEqual = (a, b) => a === b
) => {
  const loadedFiles = await readFiles(options.metaUrl)(files, options);
  return isEqual(loadedFiles[0], loadedFiles[1]);
};

// data-first
export function compare2Files(
  files: [string, string],
  options: {
    metaUrl: string;
    encoding?: BufferEncoding;
  },
  isEqual?: IsEqual
): Promise<boolean>;

// data-last
export function compare2Files(
  options: {
    metaUrl: string;
    encoding?: BufferEncoding;
  },
  isEqual?: IsEqual
): (files: [string, string]) => Promise<boolean>;

export function compare2Files(...args: unknown[]) {
  return purry(_compare2Files, args);
}
