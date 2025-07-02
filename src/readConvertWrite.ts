import { readFileSync } from "fs";
import { pipe } from "remeda";
import { makeDirFileSync } from "./makeDirFileSync";
import { relToAbs } from "./relToAbs";

export function readConvertWrite(
  data: {
    inFile: string;
    converter: (content: string) => string;
    outFile?: string;
  },
  options?: {
    metaUrl?: string;
    encoding?: BufferEncoding;
  }
) {
  const { inFile, converter, outFile = "out.txt" } = data;
  const { metaUrl, encoding = "utf8" } = options || {};

  const [input, output] = [inFile, outFile].map((x) => relToAbs(x, metaUrl));

  pipe(
    // read
    readFileSync(input, encoding),
    // convert
    converter,
    // write
    (converted: string) => {
      makeDirFileSync({ filePath: output, content: converted }, options);
    }
  );
}
