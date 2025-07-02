import { readFiles } from "./readFiles";

type IsEqual = (a: string, b: string) => boolean;

export const compare2Files = async (
  files: [string, string],
  options?: {
    metaUrl?: string;
    encoding?: BufferEncoding;
  },
  isEqual: IsEqual = (a, b) => a === b
) => {
  const loadedFiles = await readFiles(files, options);
  return isEqual(loadedFiles[0], loadedFiles[1]);
};
