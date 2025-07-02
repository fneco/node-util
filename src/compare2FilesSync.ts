import { readFilesSync } from "./readFilesSync";

type IsEqual = (a: string, b: string) => boolean;

export const compare2FilesSync = (
  files: [string, string],
  options?: {
    metaUrl?: string;
    encoding?: BufferEncoding;
  },
  isEqual: IsEqual = (a, b) => a === b
) => {
  const loadedFiles = readFilesSync(files, options);
  return isEqual(loadedFiles[0], loadedFiles[1]);
};
