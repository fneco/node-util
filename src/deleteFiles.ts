import { existsSync, readdirSync } from "node:fs";
import { unlink } from "node:fs/promises";
import { relToAbs } from "./relToAbs";

export const deleteFiles = async (
  data: {
    dirPath: string;
    shouldDelete?: (filePath: string) => boolean;
  },
  metaUrl?: string
) => {
  const { dirPath, shouldDelete } = data;
  const absDirPath = relToAbs(dirPath, metaUrl);
  if (!existsSync(absDirPath)) {
    throw new Error(`not exist: ${dirPath}`);
  }
  const entries = readdirSync(absDirPath, { withFileTypes: true });

  await Promise.all(
    entries
      .filter((entry) => entry.isFile())
      .map(({ parentPath, name }) => `${parentPath}/${name}`)
      .filter(shouldDelete ?? (() => true))
      .map(async (file) => unlink(file))
  );
};
