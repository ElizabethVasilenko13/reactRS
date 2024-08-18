import { FormSubmission } from '@models/form.interface';
import { addUncontrolledFormSubmission } from '@store/form/form.slice';
import { useAppDispatch, useAppSelector } from '@store/store';
import { convertImageToBase64 } from '@utils/image-convert';
import { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import styles from './UncontrollredForm.module.scss';
import { formValidationSchema } from '@validation/form.validator';
import PasswordStrength from '@shared/components/PasswordStrength/PasswordStrength';
import FormControl from '@shared/components/FormControl/FormControl';

const UncontrollredForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { countries } = useAppSelector((state) => state.countries);

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const acceptTermsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [password, setPassword] = useState<string>('');

  const validate = async () => {
    const formData = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: genderRef.current?.value,
      acceptTerms: acceptTermsRef.current?.checked,
      picture: pictureRef.current?.files,
      country: countryRef.current?.value,
    };

    try {
      await formValidationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorObj: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) errorObj[error.path] = error.message;
        });
        setErrors(errorObj);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await validate();

    if (!isValid) {
      return;
    }

    const formData = {
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value),
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      acceptTerms: acceptTermsRef.current?.checked || false,
      picture: pictureRef.current?.files,
      country: countryRef.current?.value || '',
    };

    const picture = formData.picture && formData.picture[0] ? await convertImageToBase64(formData.picture[0]) : '';

    const submissionData: FormSubmission = {
      ...formData,
      picture,
      isUpdated: true,
    };

    dispatch(addUncontrolledFormSubmission(submissionData));
    navigate('/');
  };

  return (
    <div className={styles.formPage}>
      <Link to="/">Go to main page</Link>
      <div className={styles.formContainer}>
        <h1>User Details Form</h1>
        <form onSubmit={handleSubmit}>
          <FormControl id="name" label="Name" ref={nameRef} error={errors.name} />
          <FormControl id="age" label="Age" type="number" ref={ageRef} error={errors.age} />
          <FormControl id="email" label="Email" type="email" ref={emailRef} error={errors.email} />
          <FormControl
            id="password"
            label="Password"
            type="password"
            ref={passwordRef}
            error={errors.password}
            onChange={() => setPassword(passwordRef.current?.value || '')}
          />
          <PasswordStrength password={password} />
          <FormControl
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            ref={confirmPasswordRef}
            error={errors.confirmPassword}
          />
          <FormControl
            id="gender"
            label="Gender"
            type="select"
            ref={genderRef}
            error={errors.gender}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]}
          />
          <FormControl
            id="acceptTerms"
            label="Accept Terms and Conditions"
            type="checkbox"
            ref={acceptTermsRef}
            error={errors.acceptTerms}
          />
          <FormControl
            id="profilePicture"
            label="Profile Picture"
            type="file"
            ref={pictureRef}
            error={errors.picture}
          />
          <FormControl
            id="country"
            label="Country"
            type="text"
            list="countryList"
            ref={countryRef}
            error={errors.country}
          >
            {' '}
            <datalist id="countryList">
              {countries.map((country, index) => (
                <option key={index} value={country} />
              ))}
            </datalist>
          </FormControl>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UncontrollredForm;
