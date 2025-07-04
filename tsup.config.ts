import * as fs from "node:fs/promises";
import * as path from "node:path";
import { defineConfig } from "tsup";

const SOURCE_DIRECTORY = "src";

export default defineConfig(async () => ({
  entry: await getEntries(SOURCE_DIRECTORY),

  format: ["esm"],

  clean: true,

  // Add types to our bundle, typing is a part of our offering.
  dts: true,

  // Building for node.
  platform: "node",

  // Make CJS output more efficient by putting common CommonJS "infra" in chunks
  // outside of the utility.
  splitting: true,

  // For CJS this reduces ~29% of the size of the output, for ESM it reduces
  // ~40%!
  minify: true,
}));

/**
 * Scans the source directory and build the list of entry points we should build
 * our library for. This allows the library to be tree-shaken so that bundlers
 * can take just the utilities and functionality the user's project needs.
 *
 * TODO: We need this just because tsup doesn't support globs in the entry field. If tsup starts supporting it we can drop this and replace it with a regular glob.
 */
async function getEntries(sourceDirectory: string): Promise<Array<string>> {
  const files = await fs.readdir(sourceDirectory);
  return files
    .filter(
      (fileName) => fileName.endsWith(".ts") && !fileName.endsWith(".test.ts")
    )
    .map((fileName) => path.join(sourceDirectory, fileName));
}
