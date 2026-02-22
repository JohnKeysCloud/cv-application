import { useCallback, useState } from 'react';
import Aside from '@/components/Aside';
import { FORM_SECTIONS } from '@/data/formData';
import type { DraftData, CVData, FormValues } from '@/types/domain.types';
import { Main } from './components/Main';
import { ButtonToggle } from './library/components/ButtonToggle/ButtonToggle';

function App() {
  const [cvData, setCvData] = useState<CVData>({
    generalInformation: null,
    practicalExperience: [],
    educationalExperience: [],
  });

  const [draftData, setDraftData] = useState<DraftData>({
    generalDraft: {
      name: null,
      email: null,
      title: null,
      phoneNumber: null,
    },
    practicalDraft: {
      companyName: null,
      positionTitle: null,
      responsibilities: null,
      dateStarted: null,
      dateEnded: null,
    },
    educationalDraft: {
      schoolName: null,
      fieldOfStudy: null,
      dateStarted: null,
      dateEnded: null,
    },
  });

  const updateGeneralDraft = useCallback(
    (generalDraftData: FormValues<typeof FORM_SECTIONS.generalDraft>): void => {
      setDraftData((prev) => ({
        ...prev,
        generalDraft: generalDraftData,
      }));
    },
    [],
  );

  const updatePracticalDraft = useCallback(
    (
      practicalDraftData: FormValues<typeof FORM_SECTIONS.practicalDraft>,
    ): void => {
      setDraftData((prev) => ({
        ...prev,
        practicalDraft: practicalDraftData,
      }));
    },
    [],
  );

  const updateEducationalDraft = useCallback(
    (
      educationalDraftData: FormValues<typeof FORM_SECTIONS.educationalDraft>,
    ): void => {
      setDraftData((prev) => ({
        ...prev,
        educationalDraft: educationalDraftData,
      }));
    },
    [],
  );

  const addGeneralInformation = (
    fieldData: FormValues<typeof FORM_SECTIONS.generalDraft>,
  ): void => {
    setCvData((prev) => ({
      ...prev,
      generalInformation: fieldData,
    }));
  };

  const addPracticalExperience = (
    fieldData: FormValues<typeof FORM_SECTIONS.practicalDraft>,
  ): void => {
    setCvData((prev) => ({
      ...prev,
      practicalExperience: [...prev.practicalExperience, fieldData],
    }));
  };

  const addEducationalExperience = (
    fieldData: FormValues<typeof FORM_SECTIONS.educationalDraft>,
  ): void => {
    setCvData((prev) => ({
      ...prev,
      educationalExperience: [...prev.educationalExperience, fieldData],
    }));
  };

  const [isActive, setIsActive] = useState(false);

  const ASIDE_ID = 'aside';
  const MAIN_ID = 'main';

  const toggleProps = {
    controlledElementId: ASIDE_ID,
    isControlledElementActive: isActive,
    onClick: () => setIsActive((prev) => !prev),
    classNames: ['aside-toggle'],
  };

  return (
    <>
      <nav>
        <ButtonToggle {...toggleProps} />
        {/* TODO: Add view/save as photo/pdf buttons */}
      </nav>
      <Aside
        id={ASIDE_ID}
        isOpen={isActive}
        updateGeneralDraft={updateGeneralDraft}
        updatePracticalDraft={updatePracticalDraft}
        updateEducationalDraft={updateEducationalDraft}
        addGeneralInformation={addGeneralInformation}
        addPracticalExperience={addPracticalExperience}
        addEducationalExperience={addEducationalExperience}
      />
      <Main id={MAIN_ID} cvData={cvData} draftData={draftData} />
    </>
  );
}

export default App;
