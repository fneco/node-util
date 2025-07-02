import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { CallableObjectWithCurriedFn } from "./type";

const _relToAbs = (
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

export const relToAbs: CallableObjectWithCurriedFn<typeof _relToAbs> =
  _relToAbs as any;

relToAbs.curried = (fileUrl, paths) => (path) => {
  return _relToAbs(path, fileUrl, paths);
};
