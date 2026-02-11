// utils/objects.ts

export function pluck<
  const T extends readonly Record<string, unknown>[],
  K extends keyof T[number],
>(arr: T, key: K): readonly T[number][K][] {
  const extractKey = (item: T[number]) => item[key];

  return arr.map(extractKey) as readonly T[number][K][];
}
