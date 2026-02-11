import styles from '@/Main.module.scss';
import type { DataType, Heading, MainProps } from '@/types/Main.types';
import { camelToKebab } from "@/library/utilities/text-formatting";

// youAreHere
export function Main({ id, cvData, draftData }: MainProps) {
  // const { generalInformation, educationalExperience, practicalE÷xperience } = cvData;
  // const { generalDraft, educationDraft, practicalDraft } = draftData;  

  return (
    <main id={id}>
      <div id={styles['cv-preview-section']}>
        <section id={styles['cv-preview']}>
          {/* Object.entries(draftData) gives you [string, unknown][]. 
          So in const [type, data] = dataSet, type is typed as string. 
          Thats where a type guard comes in 💭 */}
          {Object.entries(draftData).map((dataSet) => {
            const [type, data] = dataSet;

            const headings: Record<DataType, Heading> = {
              generalDraft: null,
              practicalDraft: 'Experience',
              educationDraft: 'Education',
            };

            return (
              <div
                key={type}
                id={styles[camelToKebab(type)]}
                className={styles['draft-container']}
              >
                //! {/* youAreHere */}
                <h3>{headings[type] != null && headings[type]}</h3> 
                <ul>
                  {Object.entries(data).map((keyValuePair) => {
                    const [key, value] = keyValuePair;

                    return (
                      <li key={key}>
                        <span>{key}:</span>
                        <span>{value}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </section> 
      </div>
      
      {/* intentional inline display of none for now */}
      <div id={styles['cv-printable-viewport']}>
        <section id={styles['cv-printable']}></section>
      </div>
    </main>
  );
}