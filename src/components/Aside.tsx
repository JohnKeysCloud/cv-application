import styles from '@/components/Aside.module.scss';
import { FORM_SECTIONS } from '@/data/formData';
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
            fields={FORM_SECTIONS.generalDraft}
            handleAddToCV={addGeneralInformation}
            updateDraft={updateGeneralDraft}
          />
          <FormSection
            title="Practical Experience"
            fields={FORM_SECTIONS.practicalDraft}
            handleAddToCV={addPracticalExperience}
            updateDraft={updatePracticalDraft}
          />
          <FormSection
            title="Educational Experience"
            fields={FORM_SECTIONS.educationalDraft}
            handleAddToCV={addEducationalExperience}
            updateDraft={updateEducationalDraft}
          />
        </div>
      </div>
    </aside>
  );
}
