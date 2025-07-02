import { execSync } from "child_process";

export const getGitCommitHash = () => {
  return execSync("git rev-parse --short HEAD", {
    encoding: "utf-8",
  }).trim();
};
