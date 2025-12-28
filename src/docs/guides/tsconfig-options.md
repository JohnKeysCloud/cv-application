# 💭 Cyclone Studios: tsconfig Explained

This document breaks down every TypeScript compiler option used in this project and explains what it does in plain language. Settings are grouped by the file where they appear.

---

## Top Level: `tsconfig.json`

- `files: []`  
  We do not list specific files at the root level. Instead, we rely on the project references below.

- `references`  
  Points to `tsconfig.app.json` and `tsconfig.node.json`. This enables project references so each environment (browser app and Node tooling) can build using the shared base configuration.

---

## Shared Defaults: `tsconfig.base.json`

### Core build settings

- `target: "ES2022"`  
  Emit modern JavaScript syntax that matches the ES2022 standard.

- `module: "ESNext"`  
  Output native ES modules so that Vite can handle bundling efficiently.

- `moduleResolution: "bundler"`  
  Let the bundler (Vite) decide how modules are resolved. This matches modern tooling expectations.

- `moduleDetection: "force"`  
  Treat every file with an import or export as a module, which avoids accidental global scripts.

- `verbatimModuleSyntax: true`  
  Preserve the exact import and export statements without rewriting them.

- `useDefineForClassFields: true`  
  Use the new standard for class field semantics, matching how modern browsers interpret class fields.

- `allowImportingTsExtensions: true`  
  Permit imports that end with `.ts` or `.tsx`. This helps when referencing files in tooling scripts.

- `skipLibCheck: true`  
  Skip type checking for declaration files inside `node_modules`. This speeds up builds.

- `noEmit: true`  
  Tell the compiler to type-check only. Vite handles emitting JavaScript.

- `sourceMap: true`  
  Generate source maps so we can debug TypeScript in the browser.

- `forceConsistentCasingInFileNames: true`  
  Prevents case mismatches in imports, which is important on case-sensitive file systems.

- `importHelpers: true`  
  Reduce bundle size by importing helper functions from `tslib` instead of inlining them.

- `resolveJsonModule: true`  
  Allow importing JSON files directly as modules.

### Path aliases

- `baseUrl: "."`  
  Set the root for module resolution to the project directory.

- `paths: { "@/*": ["src/*"] }`  
  Create an alias so `@/something` points to files inside `src/`.

### Strictness

- `strict: true`  
  Enable the full suite of strict type-checking rules.

- `noImplicitAny: true`  
  Require every value to have a known type instead of falling back to `any`.

- `strictNullChecks: true`  
  Make TypeScript treat `null` and `undefined` as distinct values that must be handled explicitly.

- `strictFunctionTypes: true`  
  Enforce safer function variance rules so callbacks must match exactly.

- `strictBindCallApply: true`  
  Ensure `bind`, `call`, and `apply` are used with arguments that match the function signature.

- `strictPropertyInitialization: true`  
  Force class properties to be initialized before use.

- `noImplicitThis: true`  
  Prevent `this` from defaulting to `any` in functions.

- `alwaysStrict: true`  
  Emit `"use strict"` in every file to match strict mode semantics.

### Extra strictness

- `exactOptionalPropertyTypes: true`  
  Distinguish between an optional property being missing versus explicitly set to `undefined`.

- `noUncheckedIndexedAccess: true`  
  Add `undefined` to the result of indexed access (`obj[key]`) so you must handle missing keys.

- `useUnknownInCatchVariables: true`  
  Catch blocks treat the error as `unknown`, encouraging explicit narrowing.

- `noImplicitOverride: true`  
  Require the `override` keyword when subclass methods replace base class methods.

- `noImplicitReturns: true`  
  Force every code path in a function to return a value explicitly.

- `noFallthroughCasesInSwitch: true`  
  Prevent accidental fall-through between `switch` cases.

- `noUncheckedSideEffectImports: true`  
  Warn when an import has side effects but the module is never read.

- `noPropertyAccessFromIndexSignature: true`  
  Disallow dot notation (`obj.foo`) on objects that only declare an index signature, enforcing bracket access (`obj["foo"]`).

### Code hygiene

- `noUnusedLocals: true`  
  Report variables that are declared but never used.

- `noUnusedParameters: true`  
  Report function parameters that are never used.

- `erasableSyntaxOnly: true`  
  Limit type-checking to syntax that can be erased during compilation. This pairs well with modern bundlers.

### Libraries

- `lib: ["ES2022", "DOM", "DOM.Iterable"]`  
  Include type definitions for modern JavaScript, browser APIs, and iterable DOM collections.

---

## Browser Build: `tsconfig.app.json`

- `extends: "./tsconfig.base.json"`  
  Inherit all the shared settings described above.

- `compilerOptions.tsBuildInfoFile`  
  Store incremental build information in `node_modules/.tmp/tsconfig.app.tsbuildinfo`. This speeds up rebuilds.

- `compilerOptions.jsx: "react-jsx"`  
  Use the new JSX transform introduced with React 17+. This removes the need to import React at the top of every file.

- `compilerOptions.types: ["vite/client"]`  
  Include Vite’s runtime type definitions, which provide helper globals like `import.meta.env`.

- `include: ["src"]`  
  Limit this configuration to files inside the `src` directory.

---

## Node Tooling: `tsconfig.node.json`

- `extends: "./tsconfig.base.json"`  
  Reuse the common settings.

- `compilerOptions.tsBuildInfoFile`  
  Store incremental build info for Node-specific files in `node_modules/.tmp/tsconfig.node.tsbuildinfo`.

- `compilerOptions.target: "ES2023"`  
  Emit slightly newer JavaScript specifically for Node, taking advantage of its modern runtime features.

- `compilerOptions.lib: ["ES2023"]`  
  Use Node’s JavaScript library definitions instead of browser DOM types.

- `compilerOptions.types: ["node"]`  
  Provide the Node.js global type definitions (such as `process` and `__dirname`).

- `include: ["vite.config.ts"]`  
  Type-check only the Vite configuration and any other Node tooling files we add here.

---

## Summary

- `tsconfig.base.json` holds the shared strict settings for both the app and tooling.
- `tsconfig.app.json` layers on browser-specific options like JSX handling.
- `tsconfig.node.json` switches libraries and targets for Node-based scripts.
- The root `tsconfig.json` stitches everything together through project references.

With these configurations, the project stays type-safe, modern, and aligned with both browser and Node environments.
