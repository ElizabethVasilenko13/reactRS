import classNames from 'classnames';
import FormError from '@shared/components/FormError/FormError';
import styles from './FormControl.module.scss';
import { forwardRef } from 'react';
import { FormFields } from '@models/form.interface';
import { UseFormRegister } from 'react-hook-form';

type FormControlProps = {
  id: string;
  label: string;
  type?: 'text' | 'number' | 'email' | 'password' | 'checkbox' | 'file' | 'select';
  error?: string;
  list?: string;
  options?: { value: string; label: string }[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  children?: React.ReactNode;
  register?: UseFormRegister<FormFields>;
};

const FormControl = forwardRef<HTMLInputElement | HTMLSelectElement, FormControlProps>(
  ({ id, label, type = 'text', error, options, onChange, children, list }, ref) => {
    const noOutline = type === 'file' || type === 'checkbox' || type === 'select';

    const renderInput = () => {
      switch (type) {
        case 'select':
          return (
            <>
              <label htmlFor={id}>{label}</label>
              <select id={id} ref={ref as React.RefObject<HTMLSelectElement>} onChange={onChange}>
                <option value="">Select</option>
                {options?.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </>
          );
        case 'checkbox':
          return (
            <>
              <label htmlFor={id}>
                <input id={id} type={type} ref={ref as React.RefObject<HTMLInputElement>} onChange={onChange} />
                {label}
              </label>
            </>
          );
        case 'file':
          return (
            <>
              <label htmlFor={id}>{label}</label>
              <input id={id} type={type} ref={ref as React.RefObject<HTMLInputElement>} onChange={onChange} />
            </>
          );
        default:
          return (
            <>
              <label htmlFor={id}>{label}</label>
              <div className={styles.inputContainer}>
                <input
                  id={id}
                  type={type}
                  ref={ref as React.RefObject<HTMLInputElement>}
                  onChange={onChange}
                  list={list}
                />
              </div>
            </>
          );
      }
    };

    return (
      <div
        className={classNames(styles.formControl, {
          [styles.invalid]: error,
          [styles.noOutline]: noOutline,
          [styles.checkboxContainer]: type === 'checkbox',
        })}
      >
        {renderInput()}
        {children}
        <FormError error={error} />
      </div>
    );
  }
);

FormControl.displayName = 'FormControl';

export default FormControl;
