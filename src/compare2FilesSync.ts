import { purry } from "remeda";
import { readFilesSync } from "./readFilesSync";

type IsEqual = (a: string, b: string) => boolean;

export const _compare2FilesSync = (
  files: [string, string],
  options: {
    metaUrl: string;
    encoding?: BufferEncoding;
  },
  isEqual: IsEqual = (a, b) => a === b
) => {
  const loadedFiles = readFilesSync(options.metaUrl)(files, options);
  return isEqual(loadedFiles[0], loadedFiles[1]);
};

// data-first
export function compare2FilesSync(
  files: [string, string],
  options: {
    metaUrl: string;
    encoding?: BufferEncoding;
  },
  isEqual?: IsEqual
): boolean;

// data-last
export function compare2FilesSync(
  options: {
    metaUrl: string;
    encoding?: BufferEncoding;
  },
  isEqual?: IsEqual
): (files: [string, string]) => boolean;

export function compare2FilesSync(...args: unknown[]) {
  return purry(_compare2FilesSync, args);
}
