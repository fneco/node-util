import { memoize } from "../fn";
import { exec } from "./exec";

export const getGitAbsPath = memoize(() => {
  return exec("git rev-parse --show-toplevel");
});
