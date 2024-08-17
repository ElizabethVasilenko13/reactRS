import { FormSubmission } from '@models/form.interface';
import { addUncontrolledFormSubmission } from '@store/form/form.slice';
import { useAppDispatch, useAppSelector } from '@store/store';
import { convertImageToBase64 } from '@utils/image-convert';
import { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import styles from './UncontrollredForm.module.scss';
import { formValidationSchema } from '@validation/form.validator';
import classNames from 'classnames';

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
    <>
      <Link to="/" className={styles.link}>
        Go to main page
      </Link>
      <div className={styles.formContainer}>
        <h1>User Details Form</h1>
        <form onSubmit={handleSubmit}>
          <div className={classNames(styles.formControl, { [styles.invalid]: errors.name })}>
            <label htmlFor="name">Name</label>
            <div className={styles.inputContainer}>
              <input id="name" ref={nameRef} />
            </div>
            <div className={styles.inputErrorContainer}>
              {errors.name && <div className={styles.inputError}>{errors.name}</div>}
            </div>{' '}
          </div>
          <div className={classNames(styles.formControl, { [styles.invalid]: errors.age })}>
            <label htmlFor="age">Age</label>
            <div className={styles.inputContainer}>
              {' '}
              <input id="age" type="number" ref={ageRef} />
            </div>
            <div className={styles.inputErrorContainer}>
              {errors.age && <div className={styles.inputError}>{errors.age}</div>}
            </div>{' '}
          </div>
          <div className={classNames(styles.formControl, { [styles.invalid]: errors.email })}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputContainer}>
              {' '}
              <input id="email" type="email" ref={emailRef} />
            </div>
            <div className={styles.inputErrorContainer}>
              {errors.email && <div className={styles.inputError}>{errors.email}</div>}
            </div>{' '}
          </div>
          <div className={classNames(styles.formControl, { [styles.invalid]: errors.password })}>
            <label htmlFor="password">Password</label>
            <div className={styles.inputContainer}>
              {' '}
              <input id="password" type="password" ref={passwordRef} />
            </div>
            <div className={styles.inputErrorContainer}>
              {errors.password && <div className={styles.inputError}>{errors.password}</div>}
            </div>{' '}
          </div>
          <div className={classNames(styles.formControl, { [styles.invalid]: errors.confirmPassword })}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className={styles.inputContainer}>
              {' '}
              <input id="confirmPassword" type="password" ref={confirmPasswordRef} />
            </div>
            <div className={styles.inputErrorContainer}>
              {errors.confirmPassword && <div className={styles.inputError}>{errors.confirmPassword}</div>}
            </div>
          </div>
          <div className={classNames(styles.formControl, { [styles.invalid]: errors.gender })}>
            <label htmlFor="gender">Gender</label>
            <div className={styles.select}>
              <select id="gender" ref={genderRef}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className={styles.inputErrorContainer}>
              {errors.gender && <div className={styles.inputError}>{errors.gender}</div>}
            </div>
          </div>
          <div className={classNames(styles.formControl, { [styles.invalid]: errors.acceptTerms })}>
            <label htmlFor="acceptTerms">
              Accept Terms and Conditions
              <input id="acceptTerms" type="checkbox" ref={acceptTermsRef} />
            </label>
            <div className={styles.inputErrorContainer}>
              {errors.acceptTerms && <div className={styles.inputError}>{errors.acceptTerms}</div>}
            </div>
          </div>
          <div className={classNames(styles.formControl, { [styles.invalid]: errors.picture })}>
            <label htmlFor="profilePicture">Profile Picture</label>
            <input id="profilePicture" type="file" accept="image/png, image/jpeg" ref={pictureRef} />
            <div className={styles.inputErrorContainer}>
              {errors.picture && <div className={styles.inputError}>{errors.picture}</div>}
            </div>
          </div>
          <div className={classNames(styles.formControl, { [styles.invalid]: errors.country })}>
            <label htmlFor="country">Country</label>
            <div className={styles.inputContainer}>
              {' '}
              <input id="country" list="countryList" ref={countryRef} />
            </div>
            <datalist id="countryList">
              {countries.map((country, index) => (
                <option key={index} value={country} />
              ))}
            </datalist>
            <div className={styles.inputErrorContainer}>
              {errors.country && <div className={styles.inputError}>{errors.country}</div>}
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UncontrollredForm;
