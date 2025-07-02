import { mkdirSync, renameSync } from "fs";
import { dirname } from "path";
import { relToAbs } from "./relToAbs";

export const moveFile = (
  data: { from: string; to: string },
  metaUrl?: string
) => {
  const [form, to] = [data.from, data.to].map((x) => relToAbs(x, metaUrl));
  const destDir = dirname(to);
  mkdirSync(destDir, { recursive: true });
  renameSync(form, to);
};
