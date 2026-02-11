import type { CVData, DraftData } from '@/types/shared.types';

export type DataType = 'generalDraft' | 'practicalDraft' | 'educationDraft';
export type Heading = null | 'Experience' | 'Education';

export interface MainProps {
  id: string;
  cvData: CVData;
  draftData: DraftData;
}
