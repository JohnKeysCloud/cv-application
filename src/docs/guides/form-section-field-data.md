# 💭 Cyclone Studios: Understanding `FieldSectionFieldData`

> Complexity level: Advanced TypeScript feature

This guide explains the thought process behind the `FieldSectionFieldData` helper type that powers data-safe communication between `FormSection` and the rest of the CV application. The goal is to help newcomers understand why the type exists, how it works, and what TypeScript features it demonstrates.

---

## Why this type exists

Each `FormSection` receives a list of fields, such as the general information or education configuration. Rather than manually repeat the shape of every form object, we derive it directly from the field list. That keeps the form definitions and the TypeScript types in sync automatically.

`FieldSectionFieldData` captures that pattern so other parts of the app (like `App.tsx` or `Aside.tsx`) can reuse the exact `values` type that `FormSection` already knows about.

---

## The type definition

```ts
type FieldSectionFieldData<FieldList extends readonly { key: string }[]> =
  FormSectionProps<
    FieldList[number]['key'],
    Record<FieldList[number]['key'], string | null>
  >['values'];
```

Let us break this down from the inside out:

1. **`FieldList extends readonly { key: string }[]`**  
   This is the generic constraint. Whatever we pass in has to be an array (or tuple) of objects that each contain at least a `key: string` property. Our field configs satisfy this because every entry looks like `{ key: 'name', label: 'Name', ... }`.

2. **`FieldList[number]['key']`**  
   This uses two indexed access operations:
   - `FieldList[number]` accesses the union of all element types in the array.
   - `['key']` extracts the `key` property from each element.  
   The result is a union of literal keys such as `"name" | "email" | "phoneNumber"`.

3. **`Record<FieldList[number]['key'], string | null>`**  
   Now we convert the union of keys into an object shape where each key maps to `string | null`. That gives us the exact shape of the `values` object expected by the form section.

4. **`FormSectionProps<...>['values']`**  
   Finally, we plug those two pieces into the `FormSectionProps` interface and extract the `values` property type via another indexed access (`['values']`). This means `FieldSectionFieldData` is literally “whatever the `values` prop type would be for a `FormSection` configured with `FieldList`.”

---

## Step-by-step inference flow

Assume we call the helper like this:

```ts
type GeneralInfoValues = FieldSectionFieldData<typeof FORM_SECTIONS.generalDraft>;
```

1. `typeof FORM_SECTIONS.generalDraft` gives us the tuple of field objects from `formData.ts` (where `FORM_SECTIONS` is the single export).
2. `FieldList[number]['key']` becomes `"name" | "email" | "title" | "phoneNumber"`.
3. `Record<...>` maps those keys to `string | null`, creating `{ name: string | null; email: string | null; title: string | null; phoneNumber: string | null; }`.
4. `FormSectionProps<...>['values']` extracts the `values` prop type from the component, which is the same object type from step 3.

From there, TypeScript enforces the structure every time you pass data around (e.g., `addGeneralInformation(values)`), so typos or missing fields fail at compile time.

---

## Using the helper type

Example from `App.tsx`:

```ts
const addGeneralInformation = (
  values: FieldSectionFieldData<typeof FORM_SECTIONS.generalDraft>
) => {
  setCvData(prev => ({ ...prev, generalInformation: values }));
};
```

Even though `values` is passed around several layers, TypeScript guarantees the keys match the latest `FORM_SECTIONS.generalDraft` definition. Updating the field configuration in `formData.ts` automatically updates the type everywhere the helper is used.

---

## Key TypeScript features demonstrated

- **Generic type parameters** (`FieldList extends ...`)
- **Indexed access types** (`FieldList[number]['key']`, `...['values']`)
- **Type inference from runtime data** (`typeof FORM_SECTIONS.generalDraft`)
- **Utility types** (`Record`)
- **Reusing component prop types** to avoid duplication

These techniques let you build advanced, type-safe patterns on top of regular React components.

---

## Summary

`FieldSectionFieldData` serves as a bridge between the field definitions and the component props, ensuring that every piece of form data stays perfectly aligned with the configuration. Although the TypeScript concepts are advanced, the payoff is significant: zero duplication, instant type safety, and confidence that your forms can never get out of sync with their state.
