import type { CVData, DraftData } from '@/types/domain.types';

export type CvDataType = 'generalDraft' | 'practicalDraft' | 'educationDraft';
export type CVHeading = null | 'Experience' | 'Education';

export interface MainProps {
  id: string;
  cvData: CVData;
  draftData: DraftData;
}
