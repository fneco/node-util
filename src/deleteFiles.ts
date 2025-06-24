import { existsSync, readdirSync } from "node:fs";
import { unlink } from "node:fs/promises";
import { relToAbs } from "./relToAbs";

export const deleteFiles =
  (metaUrl: string) =>
  async (data: {
    dirPath: string;
    shouldDelete?: (filePath: string) => boolean;
  }) => {
    const { dirPath, shouldDelete } = data;
    const toAbs = relToAbs(metaUrl);
    const absDirPath = toAbs(dirPath);
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
