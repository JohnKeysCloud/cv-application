import styles from '@/components/Aside.module.scss'
import {
  GENERAL_INFORMATION,
  EDUCATIONAL_EXPERIENCE,
  PRACTICAL_EXPERIENCE,
} from '@/data/formData';
import FormSection from './FormSection';
import type { AsideProps } from '@/types/Aside.types';

export default function Aside({
  id,
  isOpen,
  updateGeneralDraft,
  updatePracticalDraft,
  updateEducationalDraft,
  addGeneralInformation,
  addEducationalExperience,
  addPracticalExperience,
}: AsideProps) {
  return (
    <aside id={id} role="region" aria-label="CV editor" aria-hidden={!isOpen}>
      <div className={styles['aside-content-container']}>
        <h2>Build Your CV</h2>
        <pre>
          <code>&lt;aside&gt;</code>
        </pre>
        <div className={styles['form-section-container']}>
          <FormSection
            title="General Information"
            fields={GENERAL_INFORMATION}
            handleAddToCV={addGeneralInformation}
            updateDraft={updateGeneralDraft}
          />
          <FormSection
            title="Practical Experience"
            fields={PRACTICAL_EXPERIENCE}
            handleAddToCV={addPracticalExperience}
            updateDraft={updatePracticalDraft}
          />
          <FormSection
            title="Educational Experience"
            fields={EDUCATIONAL_EXPERIENCE}
            handleAddToCV={addEducationalExperience}
            updateDraft={updateEducationalDraft}
          />
        </div>
      </div>
    </aside>
  );
}