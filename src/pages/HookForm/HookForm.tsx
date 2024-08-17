import { FormFields, FormSubmission } from '@models/form.interface';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '@store/store';
import { formValidationSchema } from '@validation/form.validator';
import { convertImageToBase64 } from '@utils/image-convert';
import { addReactHookFormSubmission } from '@store/form/form.slice';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import styles from './HookForm.module.scss';

const HookForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { countries } = useAppSelector((state) => state.countries);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormFields>({ resolver: yupResolver(formValidationSchema), mode: 'all' });

  const onSubmit = async (data: FormFields) => {
    const picture = data.picture[0] ? await convertImageToBase64(data.picture[0]) : '';

    const submissionData: FormSubmission = {
      ...data,
      picture,
      isUpdated: true,
    };

    dispatch(addReactHookFormSubmission(submissionData));
    navigate('/');
  };

  return (
    <>
      <Link to="/" className={styles.link}>
        Go to main page
      </Link>
      <div className={styles.formContainer}>
        <h1>User Details Form</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classNames(styles.formControl, { [styles.invalid]: errors.name })}>
            <label htmlFor="name">Name</label>
            <div className={styles.inputContainer}>
              <input id="name" {...register('name')} />
            </div>
            <div className={styles.inputErrorContainer}>
              {errors.name && <div className={styles.inputError}>{errors.name.message}</div>}
            </div>
          </div>
          <div className={classNames(styles.formControl, { [styles.invalid]: errors.age })}>
            <label htmlFor="age">Age</label>
            <div className={styles.inputContainer}>
              <input id="age" type="number" {...register('age')} />
            </div>
            <div className={styles.inputErrorContainer}>
              {errors.age && <div className={styles.inputError}>{errors.age.message}</div>}
            </div>
          </div>
          <div className={classNames(styles.formControl, { [styles.invalid]: errors.email })}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputContainer}>
              <input id="email" type="email" {...register('email')} />
            </div>
            <div className={styles.inputErrorContainer}>
              {errors.email && <div className={styles.inputError}>{errors.email.message}</div>}
            </div>
          </div>
          <div className={classNames(styles.formControl, { [styles.invalid]: errors.password })}>
            <label htmlFor="password">Password</label>
            <div className={styles.inputContainer}>
              <input id="password" type="password" {...register('password')} />
            </div>
            <div className={styles.inputErrorContainer}>
              {errors.password && <div className={styles.inputError}>{errors.password.message}</div>}
            </div>
          </div>
          <div className={classNames(styles.formControl, { [styles.invalid]: errors.confirmPassword })}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className={styles.inputContainer}>
              <input id="confirmPassword" type="password" {...register('confirmPassword')} />
            </div>
            <div className={styles.inputErrorContainer}>
              {errors.confirmPassword && <div className={styles.inputError}>{errors.confirmPassword.message}</div>}
            </div>
          </div>
          <div className={classNames(styles.formControl, { [styles.invalid]: errors.gender })}>
            <label htmlFor="gender">Gender</label>
            <div className={styles.select}>
              <select id="gender" {...register('gender')}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className={styles.inputErrorContainer}>
              {errors.gender && <div className={styles.inputError}>{errors.gender.message}</div>}
            </div>
          </div>
          <div className={classNames(styles.checkbox, { [styles.invalid]: errors.acceptTerms })}>
            <label htmlFor="acceptTerms">
              Accept Terms and Conditions
              <input id="acceptTerms" type="checkbox" {...register('acceptTerms')} />
            </label>
            <div className={styles.inputErrorContainer}>
              {errors.acceptTerms && <div className={styles.inputError}>{errors.acceptTerms.message}</div>}
            </div>
          </div>
          <div className={classNames(styles.formControl, { [styles.invalid]: errors.picture })}>
            <label htmlFor="profilePicture">Profile Picture</label>
            <div>
              <input id="profilePicture" type="file" accept="image/png, image/jpeg" {...register('picture')} />
            </div>
            <div className={styles.inputErrorContainer}>
              {errors.picture && <div className={styles.inputError}>{errors.picture.message}</div>}
            </div>
          </div>
          <div className={classNames(styles.formControl, { [styles.invalid]: errors.country })}>
            <label htmlFor="country">Country</label>
            <div className={styles.inputContainer}>
              <input id="country" list="countryList" {...register('country')} />
            </div>
            <datalist id="countryList">
              {countries.map((country, index) => (
                <option key={index} value={country} />
              ))}
            </datalist>
            <div className={styles.inputErrorContainer}>
              {errors.country && <div className={styles.inputError}>{errors.country.message}</div>}
            </div>
          </div>
          <button type="submit" className={styles.submitButton} disabled={!isValid}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default HookForm;
