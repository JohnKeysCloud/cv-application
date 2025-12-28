# 💭 Cyclone Studios: Const Type Parameters Pattern

> **TypeScript 5.0 Feature**: Using `const` on generic type parameters to infer literal types

## What is it?

The `const` modifier on generic type parameters tells TypeScript to infer the **most specific (literal) type** possible instead of widening to a general type.

## Example from Codebase

```ts
// utils/arrays.ts
export function createStateFromKeys<const K extends readonly string[]>(
  keys: K
): Record<K[number], string | null> {
  return Object.fromEntries(keys.map((key) => [key, null])) as Record<
    K[number],
    string | null
  >;
}
```

## Comparison: With vs Without `const`

**Without `const`:**

```ts
const keys = ['name', 'email']; // Type: string[]
const state = createStateFromKeys(keys); 
// Returns: Record<string, string | null> ❌ (too broad)
```

**With `const`:**

```ts
const keys = ['name', 'email'] as const;
const state = createStateFromKeys(keys);
// Returns: Record<'name' | 'email', string | null> ✅ (exact literals)
```

## Why We Use It

* **Type Safety**: Prevents typos when accessing state keys
* **Autocomplete**: IDE knows exact keys available
* **Compile-time Errors**: TypeScript catches invalid keys before runtime

## Real Usage

```ts
// App.tsx
const generalInformationState = createStateFromKeys(
  pluck(GENERAL_INFORMATION, 'key')
);
// Type: Record<"name" | "email" | "phoneNumber", string | null>
// TypeScript knows EXACTLY which keys exist!
```

## Key Benefits

1. **Single Source of Truth**: Define keys once, type safety everywhere
2. **Refactor-Friendly**: Rename a key, TypeScript updates all references
3. **Zero Runtime Cost**: Pure compile-time type checking

## Related Patterns

* [Form Field Patterns](form-field-patterns.md)
* [Type Assertions](type-assertions.md)

## Further Reading

* [TypeScript 5.0 Release Notes: const Type Parameters](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#const-type-parameters)
