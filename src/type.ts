export type FistParam<Fn extends (...args: any[]) => any> = Parameters<Fn>[0];
export type LastBoundFn<Fn extends (...args: any[]) => any> = (
  x: Parameters<Fn>[0]
) => ReturnType<Fn>;

export type LastParams<Fn extends (...args: any[]) => any> = Fn extends (
  ...args: [infer _P1, ...infer LastParams]
) => any
  ? LastParams
  : never;

export type CurriedFn<Fn extends (...args: any[]) => any> = Fn extends (
  ...args: [infer FirstParam, ...infer LastParams]
) => infer Return
  ? (...p1: LastParams) => (p2: FirstParam) => Return
  : never;

export type CallableObjectWithCurriedFn<Fn extends (...args: any[]) => any> =
  Fn & {
    curried: CurriedFn<Fn>;
  };
