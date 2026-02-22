import type { CvDataType } from '@/types/Main.types';

const CV_DATA_TYPES: CvDataType[] = [
  'generalDraft',
  'practicalDraft',
  'educationDraft',
];

export function isCvDataType(x: string): x is CvDataType {
  return CV_DATA_TYPES.includes(x as CvDataType);
}

export function isString(x: unknown): x is string {
  return typeof x === 'string';
}
