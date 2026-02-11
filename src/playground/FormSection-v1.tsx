import { camelToKebab } from "../library/utilities/text-formatting";

// components/FormSection.tsx

// 💭 Code order is in 💭LOGICAL💭 Order. Read from top to bottom

type FieldConfig<FieldKey extends string> = Array<{
  key: FieldKey;
  label: string;
  placeholder: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'textarea';
}>;

interface FormSectionProps<FieldKey extends string> {
  title: string;
  fields: FieldConfig<FieldKey>;
  values: Record<FieldKey, string | null>;
  onChange: (field: FieldKey, value: string) => void;
}

export default function FormSection<FieldKey extends string>({
  title,
  fields,
  values,
  onChange
}: FormSectionProps<FieldKey>) {
  return (
    <section>
      <h2>{title}</h2>
      <div className="form-fields">
        {fields.map(field => {
          const id = camelToKebab(field.key);
          return (
            <div key={field.key} className='input-container'>
              <label htmlFor={id}>{field.label}:</label>
              <input
                type={field.type || 'text'}
                id={id}
                value={values[field.key] ?? ''}
                placeholder={field.placeholder}
                onChange={(e) => onChange(field.key, e.target.value)}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
