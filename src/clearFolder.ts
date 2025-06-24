import { mkdir, rm } from "fs/promises";

export const clearFolder = async (path: string) => {
  await rm(path, { recursive: true, force: true });
  await mkdir(path, { recursive: true });
};
