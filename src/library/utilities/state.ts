// utils/state.ts

import type { Dispatch, SetStateAction } from 'react';

export function createFieldUpdater<T>(setter: Dispatch<SetStateAction<T>>) {
  const updateField = (key: keyof T, value: string): void => {
    setter((prev) => ({ ...prev, [key]: value }) as T);
  };

  return updateField;
}