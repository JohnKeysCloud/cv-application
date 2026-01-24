import FormSection from './FormSection';
import {
  GENERAL_INFORMATION,
  EDUCATIONAL_EXPERIENCE,
  PRACTICAL_EXPERIENCE,
} from '../data/formData';
import type { FormValues } from '@/types/cv';
interface AsideProps {
  id: string;
  isOpen: boolean;
  updateGeneralDraft: (
    data: FormValues<typeof GENERAL_INFORMATION>
  ) => void;
  updateEducationalDraft: (
    data: FormValues<typeof EDUCATIONAL_EXPERIENCE>
  ) => void;
  updatePracticalDraft: (
    data: FormValues<typeof PRACTICAL_EXPERIENCE>
  ) => void;
  addGeneralInformation: (
    data: FormValues<typeof GENERAL_INFORMATION>
  ) => void;
  addEducationalExperience: (
    data: FormValues<typeof EDUCATIONAL_EXPERIENCE>
  ) => void;
  addPracticalExperience: (
    data: FormValues<typeof PRACTICAL_EXPERIENCE>
  ) => void;
}

export default function Aside({
  id,
  isOpen,
  updateGeneralDraft,
  updateEducationalDraft,
  updatePracticalDraft,
  addGeneralInformation,
  addEducationalExperience,
  addPracticalExperience,
}: AsideProps) {
  return (
    <aside
      id={id}
      role="region"
      aria-label="CV editor"
      aria-hidden={!isOpen}
    >
      <FormSection
        title="General Information"
        fields={GENERAL_INFORMATION}
        handleAddToCV={addGeneralInformation}
        updateDraft={updateGeneralDraft}
      />
      <FormSection
        title="Educational Experience"
        fields={EDUCATIONAL_EXPERIENCE}
        handleAddToCV={addEducationalExperience}
        updateDraft={updateEducationalDraft}
      />
      <FormSection
        title="Practical Experience"
        fields={PRACTICAL_EXPERIENCE}
        handleAddToCV={addPracticalExperience}
        updateDraft={updatePracticalDraft}
      />
    </aside>
  );
}