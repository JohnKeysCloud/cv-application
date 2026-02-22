const GENERAL_INFORMATION = [
  { key: 'name', label: 'Name', placeholder: 'Enter Your Name' },
  { key: 'email', label: 'Email', placeholder: 'Enter Your E-Mail' },
  { key: 'title', label: 'Title', placeholder: 'Enter your title' },
  { key: 'phoneNumber', label: 'Phone Number', type:'tel', placeholder: 'Enter Your Phone Number'  },
] as const;

const PRACTICAL_EXPERIENCE = [
  { key: 'companyName', label: 'Company Name', placeholder: 'Enter Company Name' },
  { key: 'positionTitle', label: 'Title', placeholder: 'Enter your title' },
  { key: 'responsibilities', label: 'Responsibilities', type:'textarea', placeholder: 'List Responsibilites' },
  { key: 'dateStarted', label: 'Start Date', type: 'date' },
  { key: 'dateEnded', label: 'End Date', type: 'date' },
] as const;

const EDUCATIONAL_EXPERIENCE = [
  { key: 'schoolName', label: 'School Name', placeholder: 'Enter School Name' },
  { key: 'fieldOfStudy', label: 'Field of Study', placeholder: 'Enter Field of Study' },
  { key: 'dateStarted', label: 'Start Date', type: 'date' },
  { key: 'dateEnded', label: 'End Date', type: 'date' },
] as const;

export const FORM_SECTIONS = {
  generalDraft: GENERAL_INFORMATION,
  practicalDraft: PRACTICAL_EXPERIENCE,
  educationalDraft: EDUCATIONAL_EXPERIENCE,
} as const;