import styles from './Main.module.scss';
import type { CVData, DraftData } from "@/types/cv";
import { camelToKebab } from "@/utils/text-formatting";

interface MainProps {
  cvData: CVData,
  draftData: DraftData
}

// youAreHere
export function Main({ cvData, draftData }: MainProps) {
  // const { generalInformation, educationalExperience, practicalE÷xperience } = cvData;
  // const { generalDraft, educationalDraft, practicalDraft } = draftData;  

  return (
    <main>
      <section id={styles['draft-section']}>
      {Object.entries(draftData).map((dataSet) => {
        const [type, data] = dataSet;


        return (
          <div
            key={type}
            id={styles[camelToKebab(type)]}
            className={styles['draft-container']}
          >
            <h3>{type}</h3>
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
      <section id="cv"></section>
    </main>
  );
}