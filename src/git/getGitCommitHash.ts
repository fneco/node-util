import { exec } from "./exec";

export const getGitCommitHash = () => {
  return exec("git rev-parse --show-toplevel");
};
