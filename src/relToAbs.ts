import { dirname, resolve } from "path";
import { purry } from "remeda";
import { fileURLToPath } from "url";

export const _relToAbs = (relativePath: string, fileUrl: string): string => {
  const __filename = fileURLToPath(fileUrl);
  const __dirname = dirname(__filename);
  return resolve(__dirname, relativePath);
};

export const relToAbs: {
  (relativePath: string, fileUrl: string): string;
  (fileUrl: string): (relativePath: string) => string;
} = (...args: unknown[]) => purry(_relToAbs, args) as any;
