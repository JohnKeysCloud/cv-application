import { useCallback, useState } from 'react';
import Aside from './components/Aside';
import { GENERAL_INFORMATION, EDUCATIONAL_EXPERIENCE, PRACTICAL_EXPERIENCE } from './data/formData';
import type { DraftData, CVData, FormValues } from './types/cv';
import { Main } from './components/Main';
import { Toggle } from './components/toggleButton';

function App() {
  const [cvData, setCvData] = useState<CVData>({
    generalInformation: null,
    educationalExperience: [],
    practicalExperience: [],
  });

  const [draftData, setDraftData] = useState<DraftData>({
    generalDraft: {
      name: null,
      email: null,
      phoneNumber: null,
    },
    educationDraft: {
      schoolName: null,
      fieldOfStudy: null,
      dateStarted: null,
      dateEnded: null,
    },
    practicalDraft: {
      companyName: null,
      positionTitle: null,
      responsibilities: null,
      dateStarted: null,
      dateEnded: null,
    },
  });

  const updateGeneralDraft = useCallback((
    generalDraftData: FormValues<typeof GENERAL_INFORMATION>
  ): void => {
    setDraftData((prev) => ({
      ...prev,
      generalDraft: generalDraftData,
    }));
  }, []); 

  const updateEducationalDraft = useCallback((
    educationalDraftData: FormValues<typeof EDUCATIONAL_EXPERIENCE>
  ): void => {
    setDraftData((prev) => ({
      ...prev,
      educationDraft: educationalDraftData
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

  const addGeneralInformation = (
    fieldData: FormValues<typeof GENERAL_INFORMATION>
  ): void => {
    setCvData((prev) => ({
      ...prev,
      generalInformation: fieldData,
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

  const addPracticalExperience = (
    fieldData: FormValues<typeof PRACTICAL_EXPERIENCE>
  ): void => {
    setCvData((prev) => ({
      ...prev,
      practicalExperience: [...prev.practicalExperience, fieldData],
    }));
  };

  const [isActive, setIsActive] = useState(false);

  const ASIDE_ID = 'aside';

  const toggleProps = {
    controlledElementId: ASIDE_ID,
    isControlledElementActive: isActive,
    onClick: () => setIsActive(prev => !prev),
    classNames: ['aside-toggle']
  }

  return (
    <>
      <nav>
        <Toggle {...toggleProps} />
        {/* TODO: Add view/save as photo/pdf buttons */}
      </nav>
      <Aside
        id={ASIDE_ID}
        isOpen={isActive}
        updateGeneralDraft={updateGeneralDraft}
        updateEducationalDraft={updateEducationalDraft}
        updatePracticalDraft={updatePracticalDraft}
        addGeneralInformation={addGeneralInformation}
        addEducationalExperience={addEducationalExperience}
        addPracticalExperience={addPracticalExperience}
      />
      <Main cvData={cvData} draftData={draftData} />
    </>
  );
}

export default App;
