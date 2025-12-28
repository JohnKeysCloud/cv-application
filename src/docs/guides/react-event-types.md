# 💭 Cyclone Studios: Determining React Event Types

> A practical guide to finding and using the correct event types in React with TypeScript

## The Problem

When adding event handlers in React with TypeScript, you need to specify the correct event type. But how do you know which one to use?

```typescript
// ❌ TypeScript Error: Parameter 'e' implicitly has an 'any' type
const handleClick = (e) => {
  e.preventDefault();
};
```

This guide will teach you a systematic approach to determine the correct event type every time.

---

## Method 1: Trace from the Element (Recommended)

This is the most reliable method. Follow these steps:

### Step-by-Step Decision Tree

1. **Identify the element** - What HTML element is the event on?
2. **Identify the event attribute** - What event are you handling?
3. **Determine the HTML element type** - What's the specific element type?
4. **Construct the React event type** - Combine the information

### Example from Our Codebase

```typescript
// components/FormSection.tsx
<button onClick={(e) => addToCV(e)}>Add</button>
```

**Walking through the decision tree:**

1. **Element:** `<button>`
2. **Event attribute:** `onClick`
3. **Element type:** `HTMLButtonElement`
4. **React event type:** `React.MouseEvent<HTMLButtonElement>`

**Final implementation:**

```typescript
const addToCV = (e: React.MouseEvent<HTMLButtonElement>): void => {
  e.preventDefault();
  console.log(e.currentTarget); // TypeScript knows this is HTMLButtonElement
};
```

---

## Method 2: Use IDE IntelliSense

Let TypeScript tell you the type!

### Step 1: Hover Over the Event Parameter

In your inline event handler, hover over the parameter:

```typescript
<button onClick={(e) => handleClick(e)}>
//              ^ Hover here
```

**TypeScript shows:** `(parameter) e: React.MouseEvent<HTMLButtonElement, MouseEvent>`

### Step 2: Copy the Type

Copy the type signature and use it in your function:

```typescript
const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
  // Your code here
};
```

### Pro Tip: Temporary Type Annotation

Add a type annotation directly in the JSX to see what type is expected:

```typescript
<button onClick={(e: React.MouseEvent<HTMLButtonElement>) => addToCV(e)}>
```

Now hover over `addToCV` and TypeScript will show you exactly what type it should accept!

---

## Method 3: Common Event Type Reference

Use this quick reference for the most common scenarios:

### Event Type Cheat Sheet

| Element | Event Attribute | React Event Type |
|---------|----------------|------------------|
| `<button>` | `onClick` | `React.MouseEvent<HTMLButtonElement>` |
| `<input>` | `onChange` | `React.ChangeEvent<HTMLInputElement>` |
| `<input>` | `onClick` | `React.MouseEvent<HTMLInputElement>` |
| `<input>` | `onFocus` | `React.FocusEvent<HTMLInputElement>` |
| `<input>` | `onBlur` | `React.FocusEvent<HTMLInputElement>` |
| `<form>` | `onSubmit` | `React.FormEvent<HTMLFormElement>` |
| `<textarea>` | `onChange` | `React.ChangeEvent<HTMLTextAreaElement>` |
| `<select>` | `onChange` | `React.ChangeEvent<HTMLSelectElement>` |
| `<div>` | `onClick` | `React.MouseEvent<HTMLDivElement>` |
| Any element | `onKeyDown` | `React.KeyboardEvent<HTMLElement>` |
| Any element | `onKeyUp` | `React.KeyboardEvent<HTMLElement>` |
| Any element | `onKeyPress` | `React.KeyboardEvent<HTMLElement>` |

### Event Category Reference

| Event Category | React Event Type | Common Uses |
|---------------|------------------|-------------|
| Mouse events | `React.MouseEvent<T>` | `onClick`, `onDoubleClick`, `onMouseEnter`, `onMouseLeave` |
| Keyboard events | `React.KeyboardEvent<T>` | `onKeyDown`, `onKeyUp`, `onKeyPress` |
| Form events | `React.FormEvent<T>` | `onSubmit` |
| Change events | `React.ChangeEvent<T>` | `onChange` (inputs, selects, textareas) |
| Focus events | `React.FocusEvent<T>` | `onFocus`, `onBlur` |
| Clipboard events | `React.ClipboardEvent<T>` | `onCopy`, `onPaste`, `onCut` |

**Note:** `<T>` represents the HTML element type (e.g., `HTMLButtonElement`, `HTMLInputElement`)

---

## Understanding React Synthetic Events

React wraps native browser events in "synthetic events" for cross-browser compatibility.

### The Event Type Hierarchy

```text
React.SyntheticEvent<T>
  ├── React.MouseEvent<T>
  ├── React.KeyboardEvent<T>
  ├── React.ChangeEvent<T>
  ├── React.FormEvent<T>
  ├── React.FocusEvent<T>
  ├── React.ClipboardEvent<T>
  ├── React.TouchEvent<T>
  └── React.WheelEvent<T>
```

### Generic Type Parameter (`<T>`)

The `<T>` represents the **HTML element type** that triggered the event:

```typescript
React.MouseEvent<HTMLButtonElement>  // Event from a button
React.MouseEvent<HTMLDivElement>     // Event from a div
React.ChangeEvent<HTMLInputElement>  // Change event from an input
```

### Why Specify the Element Type?

**Type Safety & Autocomplete:**

```typescript
const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
  e.currentTarget.disabled = true;  // ✅ TypeScript knows buttons have 'disabled'
  e.currentTarget.value;             // ❌ Error: buttons don't have 'value'
};

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  e.currentTarget.value;             // ✅ TypeScript knows inputs have 'value'
  e.currentTarget.disabled = true;   // ✅ Also valid for inputs
};
```

---

## Choosing the Right Level of Specificity

You have three options for specificity:

### Option 1: Highly Specific (Recommended)

```typescript
const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
  // Exact element type
};
```

**Pros:**

- Best type safety
- Best autocomplete
- Catches more errors at compile time

**Cons:**

- Less reusable across different elements

### Option 2: Generic Element

```typescript
const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
  // Works with any HTML element
};
```

**Pros:**

- More flexible
- Reusable across multiple element types

**Cons:**

- Less specific autocomplete
- Fewer compile-time checks

### Option 3: No Element Type

```typescript
const handleClick = (e: React.MouseEvent): void => {
  // Most generic
};
```

**Pros:**

- Maximum flexibility
- Works with any element

**Cons:**

- Minimal type safety for element-specific properties
- Generic autocomplete

### Recommendation

**Start specific, generalize when needed.**

Use highly specific types (Option 1) by default. If you find yourself reusing the handler across different element types, then make it more generic (Option 2).

---

## Real-World Example from Codebase

Let's fix the actual error from our `FormSection` component:

### The Error

```typescript
// App.tsx - ❌ Missing type annotation
const addToCV = (e): void => {
  e.preventDefault();
  console.log(e.target);
};

// FormSection.tsx - ❌ Missing type annotation
interface FormSectionProps<
  FieldKey extends string,
  FieldData extends Record<FieldKey, string | null>,
> {
  title: string;
  fields: FieldConfig<FieldKey>;
  values: FieldData;
  onChange: (field: FieldKey, value: string) => void;
  addToCV: (e) => void;  // ❌ Parameter 'e' implicitly has 'any' type
}
```

### The Solution

#### Step 1: Find where the event comes from

```typescript
// FormSection.tsx
<button onClick={(e) => addToCV(e)}>Add</button>
//      ^^^^^^^
```

#### Step 2: Apply the decision tree

- Element: `<button>`
- Event: `onClick`
- Element type: `HTMLButtonElement`
- React type: `React.MouseEvent<HTMLButtonElement>`

#### Step 3: Update the interface

```typescript
// FormSection.tsx - ✅ Fixed
interface FormSectionProps<
  FieldKey extends string,
  FieldData extends Record<FieldKey, string | null>,
> {
  title: string;
  fields: FieldConfig<FieldKey>;
  values: FieldData;
  onChange: (field: FieldKey, value: string) => void;
  addToCV: (e: React.MouseEvent<HTMLButtonElement>) => void;  // ✅ Typed
}
```

#### Step 4: Update the function

```typescript
// App.tsx - ✅ Fixed
const addToCV = (e: React.MouseEvent<HTMLButtonElement>): void => {
  e.preventDefault();
  console.log(e.target);
  // Now with full type safety and autocomplete!
};
```

---

## Common Patterns & Tips

### Pattern 1: Event Handler with State Update

```typescript
const [count, setCount] = useState(0);

const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>): void => {
  e.preventDefault();
  setCount((prev) => prev + 1);
};

return <button onClick={handleIncrement}>Increment</button>;
```

### Pattern 2: Input Change Handler

```typescript
const [value, setValue] = useState('');

const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  setValue(e.target.value);
};

return <input value={value} onChange={handleChange} />;
```

### Pattern 3: Form Submit Handler

```typescript
const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
  e.preventDefault();
  
  const formData = new FormData(e.currentTarget);
  // Process form data
};

return <form onSubmit={handleSubmit}>...</form>;
```

### Pattern 4: Reusable Generic Handler

```typescript
// For use across multiple element types
const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
  e.preventDefault();
  console.log(`Clicked: ${e.currentTarget.tagName}`);
};

return (
  <>
    <button onClick={handleClick}>Button</button>
    <div onClick={handleClick}>Div</div>
  </>
);
```

---

## Accessing Event Properties

Understanding what properties are available on events:

### Event Target vs Current Target

```typescript
const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
  // e.target - The element that triggered the event (could be a child)
  // Type: EventTarget (generic, needs type assertion)
  const target = e.target as HTMLElement;
  
  // e.currentTarget - The element the handler is attached to (always the button)
  // Type: HTMLButtonElement (specific, type-safe)
  e.currentTarget.disabled = true;  // ✅ Type-safe
};
```

### Common Event Properties

```typescript
const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
  e.preventDefault();        // Prevent default behavior
  e.stopPropagation();      // Stop event bubbling
  e.currentTarget;          // The button element (type-safe)
  e.target;                 // The element that triggered the event
  e.clientX;                // Mouse X coordinate (MouseEvent specific)
  e.clientY;                // Mouse Y coordinate (MouseEvent specific)
  e.shiftKey;               // Was Shift key pressed?
  e.ctrlKey;                // Was Ctrl/Cmd key pressed?
};

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
  e.key;                    // The key pressed (e.g., 'Enter', 'a')
  e.code;                   // Physical key code (e.g., 'KeyA')
  e.altKey;                 // Was Alt key pressed?
  e.shiftKey;               // Was Shift key pressed?
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  e.target.value;           // The input's current value
  e.target.checked;         // For checkboxes
};
```

---

## Troubleshooting Common Errors

### Error: "Parameter implicitly has 'any' type"

**Problem:**

```typescript
const handleClick = (e) => { ... }
```

**Solution:** Add a type annotation

```typescript
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { ... }
```

### Error: "Property does not exist on type"

**Problem:**

```typescript
interface Props {
  onClick: (e) => void;  // ❌ Missing type
}
```

**Solution:** Add the event type

```typescript
interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;  // ✅
}
```

### Error: "Type 'MouseEvent' is not assignable to type 'FormEvent'"

**Problem:** Event type mismatch

```typescript
<form onSubmit={handleClick}>  // handleClick expects MouseEvent
```

**Solution:** Match the event type to the element and attribute

```typescript
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { ... }
<form onSubmit={handleSubmit}>  // ✅ Correct event type
```

---

## Practice Exercise

Apply what you've learned:

```typescript
// Exercise: Add proper types to these handlers

// 1. Button click handler
const handleDelete = (e) => {
  e.preventDefault();
  console.log('Deleting...');
};

// 2. Input change handler
const handleNameChange = (e) => {
  setName(e.target.value);
};

// 3. Form submit handler
const handleFormSubmit = (e) => {
  e.preventDefault();
  console.log('Submitting form...');
};

// 4. Keyboard event handler
const handleEscapeKey = (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
};
```

### Solutions

```typescript
// 1. Button click handler
const handleDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
  e.preventDefault();
  console.log('Deleting...');
};

// 2. Input change handler
const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  setName(e.target.value);
};

// 3. Form submit handler
const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
  e.preventDefault();
  console.log('Submitting form...');
};

// 4. Keyboard event handler
const handleEscapeKey = (e: React.KeyboardEvent<HTMLElement>): void => {
  if (e.key === 'Escape') {
    closeModal();
  }
};
```

---

## Summary

**To determine the correct React event type:**

1. **Trace from the element** - Identify the element and event attribute
2. **Use the decision tree:**
   - What element? → What event? → What element type? → What React event?
3. **Use IntelliSense** - Hover to see inferred types
4. **Refer to the cheat sheet** - Common patterns and event types

**Type Construction Pattern:**

```typescript
React.<EventCategory>Event<HTML<Element>Element>
      ↑                      ↑
      MouseEvent            Button, Input, Div, etc.
      ChangeEvent
      FormEvent
      KeyboardEvent
```

**Best Practices:**

- Start with specific types, generalize when needed
- Use `currentTarget` for type-safe element access
- Use `target` when you need the actual element that triggered the event
- Always add type annotations to prevent implicit `any` types

Master this systematic approach, and you'll never struggle with React event types again! 🚀

---

## Advanced: The Second Type Parameter

You may notice when hovering over event types in your IDE that they show two type parameters:

```typescript
React.MouseEvent<Element, MouseEvent>
                 ↑       ↑
                 |       └─ The native browser event type
                 └───────── The DOM element type
```

### The Full Signature

React event types actually accept two generic parameters:

```typescript
interface MouseEvent<
  T = Element,              // The DOM element type (default: Element)
  E = NativeMouseEvent      // The native browser event type (default: MouseEvent)
> extends SyntheticEvent<T, E>
```

When you write:

```typescript
React.MouseEvent<HTMLButtonElement>
```

TypeScript implicitly treats it as:

```typescript
React.MouseEvent<HTMLButtonElement, MouseEvent>
//                                  ^^^^^^^^^^^ Implicit second parameter
```

### Why It's Almost Always Implicit

You rarely need to specify the second parameter because:

1. **React's synthetic events are standardized** - They abstract away browser differences
2. **The default is correct 99% of the time** - React maps event types to their native counterparts automatically:
   - `React.MouseEvent` → native `MouseEvent`
   - `React.KeyboardEvent` → native `KeyboardEvent`
   - `React.ChangeEvent` → native `Event`
3. **React handles the mapping** - The synthetic event system wraps the native event consistently

### When You Might Need to Specify It

Here are rare but practical scenarios where you'd specify the second parameter:

#### Scenario 1: Custom Event Extensions

When working with libraries that extend native events:

```typescript
// A library that adds custom properties to MouseEvent
interface ExtendedMouseEvent extends MouseEvent {
  customData: string;
}

const handleClick = (e: React.MouseEvent<HTMLButtonElement, ExtendedMouseEvent>): void => {
  // Now TypeScript knows about the extended properties
  console.log(e.nativeEvent.customData);
};
```

#### Scenario 2: Testing with Mock Events

When creating mock events for tests with specific native event properties:

```typescript
import { render, fireEvent } from '@testing-library/react';

// Mock a native event with specific properties
type MockMouseEvent = Partial<MouseEvent> & {
  mockProp: boolean;
};

const mockHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent & { mockProp: boolean }>) => {
  console.log(e.nativeEvent.mockProp);
};
```

#### Scenario 3: Cross-Browser Event Handling

When you need to handle browser-specific event implementations:

```typescript
// Handling events that might have different native implementations
type CrossBrowserMouseEvent = MouseEvent & {
  webkitForce?: number;  // Safari-specific
  mozPressure?: number;  // Firefox-specific
};

const handlePressure = (
  e: React.MouseEvent<HTMLElement, CrossBrowserMouseEvent>
): void => {
  const pressure = 
    e.nativeEvent.webkitForce ?? 
    e.nativeEvent.mozPressure ?? 
    0;
  
  console.log(`Pressure: ${pressure}`);
};
```

### Accessing the Native Event

The second type parameter affects what you can access on `e.nativeEvent`:

```typescript
const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
  // e.nativeEvent is typed as MouseEvent (the default second parameter)
  e.nativeEvent.screenX;  // ✅ Available
  e.nativeEvent.screenY;  // ✅ Available
  
  // React's synthetic event properties
  e.clientX;              // ✅ Available
  e.clientY;              // ✅ Available
};
```

### Best Practice

**Default behavior is almost always what you want:**

```typescript
// ✅ Recommended - Let TypeScript use the default
React.MouseEvent<HTMLButtonElement>

// ❌ Unnecessary - Only specify if you have a specific need
React.MouseEvent<HTMLButtonElement, MouseEvent>
```

Only explicitly specify the second parameter when:

- Working with custom event extensions
- Testing scenarios require it
- Handling browser-specific event properties

**In 99% of cases, you only need to specify the first type parameter (the element type).**

---

## Related Documentation

- [TypeScript Generics Guide](typescript-generics.md)
- [Form Field Patterns](../patterns/form-field-patterns.md)
- [Type Assertions](../patterns/type-assertions.md)

## External Resources

- [React TypeScript Cheatsheet: Events](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/)
- [React SyntheticEvent Documentation](https://react.dev/reference/react-dom/components/common#react-event-object)
- [TypeScript Handbook: Type Annotations](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-annotations-on-variables)
