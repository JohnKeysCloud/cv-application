import { useCallback, useState } from 'react';
import Aside from '@/components/Aside';
import { GENERAL_INFORMATION, EDUCATIONAL_EXPERIENCE, PRACTICAL_EXPERIENCE } from '@/data/formData';
import type { DraftData, CVData, FormValues } from '@/types/shared.types';
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
      phoneNumber: null,
    },
    practicalDraft: {
      companyName: null,
      positionTitle: null,
      responsibilities: null,
      dateStarted: null,
      dateEnded: null,
    },
    educationDraft: {
      schoolName: null,
      fieldOfStudy: null,
      dateStarted: null,
      dateEnded: null,
    }
  });

  const updateGeneralDraft = useCallback((
    generalDraftData: FormValues<typeof GENERAL_INFORMATION>
  ): void => {
    setDraftData((prev) => ({
      ...prev,
      generalDraft: generalDraftData,
    }));
  }, []); 

  const updatePracticalDraft = useCallback((
    practicalDraftData: FormValues<typeof PRACTICAL_EXPERIENCE>
  ): void => {
    setDraftData((prev) => ({
      ...prev,
      practicalDraft: practicalDraftData,
    }));
  }, []); 

  const updateEducationalDraft = useCallback(
    (
      educationalDraftData: FormValues<typeof EDUCATIONAL_EXPERIENCE>
    ): void => {
      setDraftData((prev) => ({
        ...prev,
        educationDraft: educationalDraftData,
      }));
    },
    []
  );

  const addGeneralInformation = (
    fieldData: FormValues<typeof GENERAL_INFORMATION>
  ): void => {
    setCvData((prev) => ({
      ...prev,
      generalInformation: fieldData,
    }));
  };

  const addPracticalExperience = (
    fieldData: FormValues<typeof PRACTICAL_EXPERIENCE>
  ): void => {
    setCvData((prev) => ({
      ...prev,
      practicalExperience: [...prev.practicalExperience, fieldData],
    }));
  };

  const addEducationalExperience = (
    fieldData: FormValues<typeof EDUCATIONAL_EXPERIENCE>
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
    onClick: () => setIsActive(prev => !prev),
    classNames: ['aside-toggle']
  }

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
