import {
  FORM_SECTIONS
} from '@/data/formData';

export type FormValues<T extends readonly { key: string }[]> = {
  [K in T[number]['key']]: string | null;
};

export interface CVData {
  generalInformation: FormValues<typeof FORM_SECTIONS.generalDraft> | null;
  educationalExperience: Array<FormValues<typeof FORM_SECTIONS.educationalDraft>>;
  practicalExperience: Array<FormValues<typeof FORM_SECTIONS.practicalDraft>>;
}

export type DraftData = {
  generalDraft: FormValues<typeof FORM_SECTIONS.generalDraft>;
  educationalDraft: FormValues<typeof FORM_SECTIONS.educationalDraft>;
  practicalDraft: FormValues<typeof FORM_SECTIONS.practicalDraft>;
};
