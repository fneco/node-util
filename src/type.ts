export type FistParam<Fn extends (...args: any[]) => any> = Parameters<Fn>[0];
export type LastBoundFn<Fn extends (...args: any[]) => any> = (
  x: Parameters<Fn>[0]
) => ReturnType<Fn>;
