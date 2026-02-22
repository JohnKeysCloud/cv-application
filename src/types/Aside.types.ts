import {
  GENERAL_INFORMATION,
  EDUCATIONAL_EXPERIENCE,
  PRACTICAL_EXPERIENCE,
} from '@/data/formData';
import type { FormValues } from '@/types/domain.types';

export interface AsideProps {
  id: string;
  isOpen: boolean;
  updateGeneralDraft: (data: FormValues<typeof GENERAL_INFORMATION>) => void;
  updatePracticalDraft: (data: FormValues<typeof PRACTICAL_EXPERIENCE>) => void;
  updateEducationalDraft: (
    data: FormValues<typeof EDUCATIONAL_EXPERIENCE>
  ) => void;
  addGeneralInformation: (data: FormValues<typeof GENERAL_INFORMATION>) => void;
  addPracticalExperience: (
    data: FormValues<typeof PRACTICAL_EXPERIENCE>
  ) => void;
  addEducationalExperience: (
    data: FormValues<typeof EDUCATIONAL_EXPERIENCE>
  ) => void;
}
