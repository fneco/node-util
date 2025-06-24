import { readFileSync } from "fs";
import { pipe, purry } from "remeda";
import { makeDirFileSync } from "./makeDirFileSync";
import { relToAbs } from "./relToAbs";

function _readConvertWrite(
  data: {
    inFile: string;
    converter: (content: string) => string;
    outFile?: string;
  },
  options: {
    metaUrl: string;
    encoding?: BufferEncoding;
  }
) {
  const { inFile, converter, outFile = "out.txt" } = data;
  const { metaUrl, encoding = "utf8" } = options;

  const [input, output] = [inFile, outFile].map(relToAbs(metaUrl));

  pipe(readFileSync(input, encoding), converter, (converted: string) => {
    makeDirFileSync(options)({ filePath: output, content: converted });
  });
}

// data-first
export function readConvertWrite(
  data: {
    inFile: string;
    converter: (content: string) => string;
    outFile?: string;
  },
  options: {
    metaUrl: string;
    encoding?: BufferEncoding;
  }
): void;

// data-last
export function readConvertWrite(options: {
  metaUrl: string;
  encoding?: BufferEncoding;
}): (data: {
  inFile: string;
  converter: (content: string) => string;
  outFile?: string;
}) => void;

export function readConvertWrite(...args: unknown[]) {
  return purry(_readConvertWrite, args);
}
