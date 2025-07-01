import { describe, expect, test } from "vitest";

/**
 * simple implementation of purry
 */
function purry(
  fn: (...args: any) => unknown,
  args: ReadonlyArray<unknown>
): unknown {
  const diff = fn.length - args.length;
  if (diff === 0) {
    return fn(...args);
  }

  if (diff === 1) {
    const dataLast = (data: unknown): unknown => fn(data, ...args);
    return dataLast;
  }

  throw new Error("Wrong number of arguments");
}

const _ab = (a: string, b: string): string => {
  return `a:${a}, b:${b}`;
};

const ab: {
  (a: string, b: string): string;
  (b: string): (a: string) => string;
} = (...args: unknown[]) => purry(_ab, args) as any;

describe("ab", async () => {
  test("data first", () => {
    expect(ab("foo", "bar")).toBe("a:foo, b:bar");
  });
  test("data last", () => {
    const andBar = ab("bar");
    expect(andBar("foo")).toBe("a:foo, b:bar");
  });
});

// NG
const _aMaybeB = (a: string, b?: string): string => {
  return `a:${a}, b:${b ?? "undefined"}`;
};
purry(_aMaybeB, ["foo"]); // NG, b is required
