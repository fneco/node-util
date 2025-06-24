import { mkdirSync, renameSync } from "fs";
import { dirname } from "path";
import { purry } from "remeda";
import { relToAbs } from "./relToAbs";

const _moveFile = (data: { from: string; to: string }, metaUrl: string) => {
  const [form, to] = [data.from, data.to].map(relToAbs(metaUrl));
  const destDir = dirname(to);
  mkdirSync(destDir, { recursive: true });
  renameSync(form, to);
};

export function moveFile(
  data: { from: string; to: string },
  metaUrl: string
): void;

export function moveFile(
  metaUrl: string
): (data: { from: string; to: string }) => void;

export function moveFile(...args: unknown[]) {
  return purry(_moveFile, args);
}
