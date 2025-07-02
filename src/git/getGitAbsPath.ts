import { execSync } from "child_process";
import { memoize } from "../fn";

export const getGitAbsPath = memoize(() => {
  return execSync("git rev-parse --show-toplevel", {
    encoding: "utf-8",
  }).trim();
});
