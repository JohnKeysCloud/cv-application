import {
  GENERAL_INFORMATION,
  EDUCATIONAL_EXPERIENCE,
  PRACTICAL_EXPERIENCE,
} from '@/data/formData';

export type FormValues<T extends readonly { key: string }[]> = {
  [K in T[number]['key']]: string | null;
};

export interface CVData {
  generalInformation: FormValues<typeof GENERAL_INFORMATION> | null;
  educationalExperience: Array<FormValues<typeof EDUCATIONAL_EXPERIENCE>>;
  practicalExperience: Array<FormValues<typeof PRACTICAL_EXPERIENCE>>;
}

export type DraftData = {
  generalDraft: FormValues<typeof GENERAL_INFORMATION>;
  educationDraft: FormValues<typeof EDUCATIONAL_EXPERIENCE>;
  practicalDraft: FormValues<typeof PRACTICAL_EXPERIENCE>;
};