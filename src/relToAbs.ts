import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

export const relToAbs = (
  path: string,
  fileUrl?: string,
  paths: string[] = []
): string => {
  if (!fileUrl) {
    // return path as absolute path if no fileUrl is provided
    return path;
  }
  const __filename = fileURLToPath(fileUrl);
  const __dirname = dirname(__filename);
  return resolve(__dirname, ...(paths ?? []), path);
};
