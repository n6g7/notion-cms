// https://itnext.io/implementing-arithmetic-within-typescripts-type-system-a1ef140a6f6f

type Length<T extends any[]> = T extends { length: infer L } ? L : never;

type BuildTuple<L extends number, T extends any[] = []> = T extends {
  length: L;
}
  ? T
  : BuildTuple<L, [...T, any]>;

export type Subtract<
  A extends number,
  B extends number
> = BuildTuple<A> extends [...infer U, ...BuildTuple<B>] ? Length<U> : never;
