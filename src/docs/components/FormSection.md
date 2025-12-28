# 💭 Cyclone Studios: FormSection Component

> A generic, type-safe form section component that ensures compile-time correctness between field definitions and form state.

## Overview

`FormSection` is a reusable React component that renders a collection of form inputs with full TypeScript type safety. It uses advanced generic type parameters to ensure that:

- Field configurations match the state object keys
- Change handlers only accept valid field keys
- Autocomplete works throughout the component
- Refactoring is safe and trackable

## Quick Start

```tsx
import FormSection from './FormSection';
import { useState } from 'react';

const fields = [
  { key: 'name', label: 'Name', placeholder: 'Enter your name' },
  { key: 'email', label: 'Email', placeholder: 'Enter your email', type: 'email' },
] as const;

function MyForm() {
  const [data, setData] = useState({
    name: null,
    email: null,
  });

  const handleChange = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <FormSection
      title="Contact Information"
      fields={fields}
      values={data}
      onChange={handleChange}
    />
  );
}
```

## Props

### Type Signature

```typescript
interface FormSectionProps<
  FieldKey extends string,
  FieldData extends Record<FieldKey, string | null>,
> {
  title: string;
  fields: FieldConfig<FieldKey>;
  values: FieldData;
  onChange: (field: FieldKey, value: string) => void;
}
```

### Parameters

| Prop       | Type                    | Description                                     |
| ---------- | ----------------------- | ----------------------------------------------- |
| `title`    | `string`                | Section heading displayed above the form fields |
| `fields`   | `FieldConfig<FieldKey>` | Array of field configuration objects            |
| `values`   | `FieldData`             | Current form state (keys must match field keys) |
| `onChange` | `(field, value) => void`| Handler called when any field value changes     |

### Field Configuration

Each field in the `fields` array must conform to:

```typescript
type FieldType<FieldKey extends string = string> = {
  key: FieldKey;        // Unique identifier (used as object key)
  label: string;        // Display label for the input
  placeholder?: string; // Optional placeholder text
  type?: 'text' | 'email' | 'tel' | 'date' | 'textarea'; // Optional input type
};
```

**Important:** Always use `as const` when defining fields to preserve literal types:

```typescript
const fields = [
  { key: 'email', label: 'Email' }
] as const; // ✅ Preserves 'email' as literal

const fields = [
  { key: 'email', label: 'Email' }
]; // ❌ key widened to string
```

## Type Safety Features

### 1. Automatic Key Extraction

TypeScript automatically extracts valid keys from your field configuration:

```typescript
const fields = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' }
] as const;

// TypeScript knows: FieldKey = 'name' | 'email'
```

### 2. State Type Enforcement

The `values` object must have exactly the keys defined in `fields`:

```typescript
// ✅ Correct
const values = { name: null, email: null };

// ❌ TypeScript Error: Missing 'email'
const values = { name: null };

// ❌ TypeScript Error: Extra key 'age'
const values = { name: null, email: null, age: null };
```

### 3. Type-Safe Change Handler

The `onChange` handler only accepts valid field keys:

```typescript
onChange('name', 'John');   // ✅ Valid
onChange('email', 'test');  // ✅ Valid
onChange('invalid', 'x');   // ❌ TypeScript Error
```

## Implementation Details

### Generic Type Parameter

```typescript
export default function FormSection<
  const FieldList extends readonly FieldType[],
>({ ... }: FormSectionProps<
  FieldList[number]['key'],
  Record<FieldList[number]['key'], string | null>
>)
```

**Key aspects:**

- `const` modifier preserves literal types from the argument
- `FieldList[number]` accesses any element in the array
- `FieldList[number]['key']` extracts the union of all key values
- `Record<...>` creates the state type from those keys

### ID Generation

The component uses `camelToKebab` to convert field keys to kebab-case for HTML `id` attributes:

```typescript
const id = camelToKebab(field.key);
// 'phoneNumber' → 'phone-number'
```

This ensures valid HTML while keeping JavaScript identifiers in camelCase.

## Real-World Example

```tsx
// components/GeneralInformation.tsx
import { useState } from 'react';
import FormSection from './FormSection';

const generalFields = [
  { key: 'name', label: 'Name', placeholder: 'Enter Your Name' },
  { key: 'email', label: 'Email', placeholder: 'Enter Your E-Mail', type: 'email' },
  {
    key: 'phoneNumber',
    label: 'Phone Number',
    placeholder: 'Enter Your Phone Number',
    type: 'tel',
  },
] as const;

export default function GeneralInformation() {
  const [data, setData] = useState({
    name: null,
    email: null,
    phoneNumber: null,
  });

  const handleChange = (field: string, value: string) => {
    setData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <FormSection
      title="General Information"
      fields={generalFields}
      values={data}
      onChange={handleChange}
    />
  );
}
```

## Patterns Used

This component demonstrates several advanced TypeScript patterns:

- **[Const Type Parameters](../patterns/const-type-parameters.md)** - Preserving literal types
- **[Form Field Patterns](../patterns/form-field-patterns.md)** - Type-safe field configuration
- **Indexed Access Types** - Extracting unions from arrays (`FieldList[number]['key']`)
- **Generic Constraints** - Ensuring type compatibility (`extends readonly FieldType[]`)

## Benefits

### Single Source of Truth

Define your fields once, all types derive automatically:

```typescript
const fields = [...] as const;
// ↓ TypeScript automatically infers:
// - Valid keys
// - State shape
// - Handler parameter types
```

### Refactor-Friendly

Rename a field key and TypeScript will show you every place that needs updating:

```typescript
// Change 'phoneNumber' to 'phone'
{ key: 'phone', ... }
// TypeScript highlights all references that need updating
```

### IDE Support

Full autocomplete for:

- Field keys in state access: `values.name`, `values.email`
- Change handler calls: `onChange('name', ...)`
- Field properties in JSX

## Common Issues

### Missing `as const`

```typescript
// ❌ Without as const
const fields = [{ key: 'name', label: 'Name' }];
// Type: { key: string; label: string }[]

// ✅ With as const
const fields = [{ key: 'name', label: 'Name' }] as const;
// Type: readonly [{ key: "name"; label: "Name" }]
```

### State Mismatch

```typescript
// Fields define: 'name', 'email'
const fields = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' }
] as const;

// ❌ State missing 'email'
const [data, setData] = useState({ name: null });
// TypeScript Error: Type '{ name: null }' is not assignable...
```

## See Also

- **[TypeScript Generics Guide](../guides/typescript-generics.md)** - Deep dive into the generic patterns used
- **[Form Field Patterns](../patterns/form-field-patterns.md)** - Quick reference for field type patterns
- **[Const Type Parameters](../patterns/const-type-parameters.md)** - Understanding the `const` modifier

## Source Files

- **Component**: `src/components/FormSection.tsx`
- **Types**: `src/types/form.ts`
- **Example Usage**: `src/components/GeneralInformation.tsx`, `src/components/EducationalExperience.tsx`
