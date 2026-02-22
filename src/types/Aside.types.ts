import { FORM_SECTIONS } from '@/data/formData';
import type { FormValues } from '@/types/domain.types';

export interface AsideProps {
  id: string;
  isOpen: boolean;
  updateGeneralDraft: (
    data: FormValues<typeof FORM_SECTIONS.generalDraft>,
  ) => void;
  updatePracticalDraft: (
    data: FormValues<typeof FORM_SECTIONS.practicalDraft>,
  ) => void;
  updateEducationalDraft: (
    data: FormValues<typeof FORM_SECTIONS.educationalDraft>,
  ) => void;
  addGeneralInformation: (
    data: FormValues<typeof FORM_SECTIONS.generalDraft>,
  ) => void;
  addPracticalExperience: (
    data: FormValues<typeof FORM_SECTIONS.practicalDraft>,
  ) => void;
  addEducationalExperience: (
    data: FormValues<typeof FORM_SECTIONS.educationalDraft>,
  ) => void;
}
