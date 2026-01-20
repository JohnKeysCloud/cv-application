import styles from './FormSection.module.scss';
import { camelToKebab } from '../utils/text-formatting';
import { useEffect, useState, type ChangeEvent } from 'react';
import type { FormValues } from '@/types/cv';

type FieldType<FieldKey extends string = string> = {
  key: FieldKey;
  label: string;
  placeholder?: string;
};

type FieldConfig<FieldKey extends string> = ReadonlyArray<
  FieldType<FieldKey> & {
    type?: 'text' | 'email' | 'tel' | 'date' | 'textarea';
  }
>;

type ExtractFieldKeys<T extends readonly { key: string }[]> = T[number]['key'];

export interface FormSectionProps<
  FieldKey extends string,
  FieldData extends Record<FieldKey, string | null>,
> {
  title: string;
  fields: FieldConfig<FieldKey>;
  handleAddToCV: (fieldData: FieldData) => void;
  updateDraft: (draftData: FieldData) => void;
}

export default function FormSection<
  const FieldList extends readonly FieldType[],
>({
  title,
  fields,
  handleAddToCV,
  updateDraft
}: FormSectionProps<
  ExtractFieldKeys<FieldList>,
  FormValues<FieldList>
  >) {
  type FieldData = FormValues<FieldList>;

  const [draftState, setDraftState] = useState<FieldData>(fields.reduce((acc, field) => {
    acc[field.key] = null
    return acc;
  }, {} as FieldData));

  useEffect(() => {
    updateDraft(draftState);
  }, [draftState, updateDraft]);

  function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>, fieldData: FieldData) {
    e.preventDefault();
    handleAddToCV(fieldData);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    
    setDraftState((prev) => ({
      ...prev,
      [name]: value
    }));
  }
      
  return (
    <form className={`${styles['form']} glass theme-light`}>
      <fieldset>
        <legend className={styles['title']}>{title}</legend>
        <div className={styles['form-field-container']}> 
          {fields.map((field) => {
            const id = camelToKebab(field.key);
            return (
              <div key={field.key} className={styles['input-container']}>
                <label htmlFor={id}>{field.label}:</label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={id}
                    name={field.key}
                    placeholder={field.placeholder}
                    value={draftState[field.key] ?? ''}
                    onChange={(e) => handleInputChange(e)}
                  ></textarea>
                ) : (
                  <input
                    type={field.type ?? 'text'}
                    id={id}
                    name={field.key}
                    placeholder={field.placeholder}
                    value={draftState[field.key] ?? ''}
                    onChange={(e) => handleInputChange(e)}
                  />
                )}
              </div>
            );
          })}
        </div>
      </fieldset>
      <button
        type="button"
        className={styles['button']}
        onClick={(e) => handleButtonClick(e, draftState)}
      >
        Add
      </button>
    </form>
  );
}
