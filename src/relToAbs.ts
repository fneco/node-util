import { dirname, resolve } from "path";
import { purry } from "remeda";
import { fileURLToPath } from "url";

const _relToAbs = (
  relativePath: string,
  fileUrl?: string,
  paths: string[] = []
): string => {
  if (!fileUrl) {
    // return relativePath as absolute path if no fileUrl is provided
    return relativePath;
  }
  const __filename = fileURLToPath(fileUrl);
  const __dirname = dirname(__filename);
  return resolve(__dirname, ...(paths ?? []), relativePath);
};

export const relToAbs: {
  (relativePath: string, fileUrl?: string, paths?: string[]): string;
  (fileUrl?: string, paths?: string[]): (relativePath: string) => string;
} = (...args: unknown[]) => purry(_relToAbs, args) as any;
