# 💭 Cyclone Studios: Form Field Patterns

> Type-safe patterns for form field configuration and state management

## Core Pattern: Field Configuration

### Basic Field Type

```ts
type FieldType<FieldKey extends string = string> = {
  key: FieldKey;
  label: string;
  placeholder?: string;
};
```

**Why `FieldKey extends string = string`?**

1. `extends string` → constrains the generic to **string subtypes** only (no numbers or booleans)
2. `= string` → provides a **default type** for flexibility

```ts
type GenericField = FieldType; // works → defaults to string
type LiteralField = FieldType<'name' | 'email'>; // stricter, type-safe
```

### Field Configuration Array

```ts
type FieldConfig<FieldKey extends string> = ReadonlyArray<
  FieldType<FieldKey> & { type?: 'text' | 'email' | 'tel' | 'date' | 'textarea' }
>;
```

## Understanding Type Extraction

### `F[number]` - Array Element Type

Access the type of an element in the array:

```ts
const fields = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" }
] as const;

type ElementType = typeof fields[number];
// -> { key: 'name'; label: 'Name' }
//  | { key: 'email'; label: 'Email' }
```

### `F[number]['key']` - Extract Keys

Access the `'key'` property from each union member:

```ts
type Keys = typeof fields[number]['key'];
// -> "name" | "email"
```

This is how TypeScript knows what keys your values object should have.

### `Record<F[number]['key'], string | null>` - State Type

Uses the union of keys to create a typed object for state/values:

```ts
Record<typeof fields[number]['key'], string | null>
// becomes:
{
  name: string | null;
  email: string | null;
}
```

No hardcoding needed—state stays perfectly aligned with fields.

## Const Constraint Pattern

Using `const` on generic parameters preserves literal types:

```ts
function FormSection<
  const F extends readonly { key: string; label: string; placeholder: string }[]
>(props: {
  fields: F;
  values: Record<F[number]['key'], string | null>;
})
```

**What `const` does:**

* **Preserves literals**: `"name"` instead of widening to `string`
* **Makes readonly**: Prevents mutation (`.pop()`, `.shift()`, etc.)
* **Enables type inference**: TypeScript infers exact tuple type

## ReadonlyArray vs `as const`

### `ReadonlyArray<T>` – Type-level immutability

```ts
const arr: ReadonlyArray<string> = ['a', 'b', 'c'];
```

* Can't modify array (no `.push()`, `.pop()`)
* Elements are still general type `string`, not literal `'a' | 'b' | 'c'`

### `as const` – Value-level deep immutability

```ts
const arr = ['a', 'b', 'c'] as const;
// type: readonly ['a', 'b', 'c']
```

* Makes array readonly
* Makes all nested values **literal types**

### Comparison Table

| Feature                    | `ReadonlyArray<T>`         | `as const`                                         |
| -------------------------- | -------------------------- | -------------------------------------------------- |
| Read-only protection       | ✅ Yes                      | ✅ Yes                                              |
| Deep immutability (nested) | ❌ No                       | ✅ Yes                                              |
| Literal inference          | ❌ No (T is generic)        | ✅ Yes (literal `'name'`, not `string`)             |
| Used at                    | Type level                 | Value level                                        |
| When to use                | Explicit type declarations | Fixed config data (like form fields) |

### Example

```ts
// Using ReadonlyArray<T>
const fields1: ReadonlyArray<{ key: string }> = [
  { key: 'name' },
  { key: 'email' },
];
// keys inferred as string

// Using as const
const fields2 = [
  { key: 'name' },
  { key: 'email' },
] as const;
// keys inferred as 'name' | 'email'

type FieldKeys = typeof fields2[number]['key']; 
// -> 'name' | 'email' ✅
```

**Takeaway:** `ReadonlyArray<T>` gives surface-level immutability, while `as const` gives deep, literal immutability—making it the superior choice for fixed configuration data.

## Generic Naming Conventions

| Generic | Meaning                                      |
| ------- | -------------------------------------------- |
| `T`     | Type (general)                               |
| `K`     | Key                                          |
| `V`     | Value                                        |
| `F`     | Field or Function (semantic in this context) |
| `U`     | Another generic                              |

## Complete Example

```ts
const generalFields = [
  { key: 'name', label: 'Name', placeholder: 'Enter name' },
  { key: 'email', label: 'Email', placeholder: 'Enter email' }
] as const;

type FieldKeys = typeof generalFields[number]['key'];
// -> 'name' | 'email'

type FormState = Record<FieldKeys, string | null>;
// -> { name: string | null; email: string | null }

const state: FormState = {
  name: null,
  email: null,
};
```

## Key Takeaways

1. `F` = literal, immutable fields array
2. `F[number]` = union of all field objects
3. `F[number]['key']` = union of field keys → used to type `values`
4. `Record<F[number]['key'], string | null>` = auto-generated state shape
5. `as const` preserves literal types and prevents mutation
6. `FieldKey extends string = string` gives flexibility for generic defaults while allowing stricter type-safe unions

## Related Patterns

* [Const Type Parameters](const-type-parameters.md)
* [TypeScript Generics Guide](../guides/typescript-generics.md)

## Further Reading

* [TypeScript: Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
* [TypeScript: const Assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)
