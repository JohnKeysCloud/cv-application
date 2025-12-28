# 💭 Cyclone Studios: Safe Type Assertions

> When and how to use type assertions (`as`) in TypeScript

## The Problem: `Object.fromEntries` Loses Type Information

`Object.fromEntries` has a broad return type that doesn't preserve literal types:

```ts
Object.fromEntries([['name', null], ['email', null]])
// Type: { [k: string]: null } ❌
// We want: { name: null, email: null } ✅
```

## Example from Codebase

```ts
// utils/arrays.ts
export function createStateFromKeys<const K extends readonly string[]>(
  keys: K
): Record<K[number], string | null> {
  return Object.fromEntries(keys.map((key) => [key, null])) as Record<
    K[number],
    string | null
  >; // ← Type assertion needed
}
```

## When Type Assertions Are Acceptable

Type assertions are okay when:

1. **You control the implementation** - You know exactly what you're creating
2. **The logic is simple** - Map keys to null, no complex transformations
3. **The alternative is worse** - Manual object building is verbose and error-prone
4. **Type safety is preserved** - The return type is correct, TypeScript just can't infer it

## When Assertions Are NOT Okay

```ts
// ❌ BAD: Lying to TypeScript about external data
const user = JSON.parse(data) as User; // Unsafe! Data could be anything

// ✅ BETTER: Use a type guard or validation
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'name' in obj &&
    'email' in obj
  );
}

const parsed = JSON.parse(data);
if (isUser(parsed)) {
  // Now TypeScript knows it's a User
  console.log(parsed.name);
}
```

## Rules of Thumb

### ✅ Safe Assertions

- **Utility functions** where you control the implementation
- **Type narrowing** when you have runtime checks
- **Working around TypeScript limitations** (like `Object.fromEntries`)

### ❌ Unsafe Assertions

- **External data** (API responses, user input, file reads)
- **"Trust me" code** without runtime validation
- **Type conversions** that could fail at runtime

## Better Alternatives

### Use Type Guards

```ts
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
```

### Use Validation Libraries

```ts
import { z } from 'zod';

const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

const user = UserSchema.parse(data); // Validates at runtime!
```

### Use Generic Constraints

```ts
function processData<T extends { id: string }>(data: T) {
  // T must have an id property
  return data.id;
}
```

## Summary

Type assertions are a tool, not a solution. Use them sparingly and only when:

1. You can guarantee correctness
2. TypeScript's inference fails you
3. The alternative is significantly worse

When in doubt, prefer **type guards**, **validation**, and **constraints** over assertions.

## Related Patterns

- [Const Type Parameters](const-type-parameters.md)
