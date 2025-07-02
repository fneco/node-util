import { execSync } from "child_process";

export const exec = (command: string) => {
  return execSync(command, {
    encoding: "utf-8",
  }).trim();
};
