// utils/arrays.ts

export function createStateFromKeys<const K extends readonly string[]>(
  keys: K
): Record<K[number], string | null> {
  return Object.fromEntries(keys.map((key) => [key, null])) as Record<
    K[number],
    string | null
  >;
}

export const concatenateStringArray = (arrayOfStrings: string[]): string =>
  arrayOfStrings.join(' ');