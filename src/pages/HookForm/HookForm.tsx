import { FormFields, FormSubmission } from '@models/form.interface';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '@store/store';
import { formValidationSchema } from '@validation/form.validator';
import { convertImageToBase64 } from '@utils/image-convert';
import { addReactHookFormSubmission } from '@store/form/form.slice';
import PasswordStrength from '@shared/components/PasswordStrength/PasswordStrength';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import styles from './HookForm.module.scss';
import FormError from '@shared/components/FormError/FormError';

const HookForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { countries } = useAppSelector((state) => state.countries);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormFields>({ resolver: yupResolver(formValidationSchema), mode: 'all' });

  const password = watch('password', '');

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
    <div className={styles.formPage}>
      <Link to="/"> Go to main page</Link>
      <div className={styles.formContainer}>
        <h1>User Details Form</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classNames(styles.formControl, { [styles.invalid]: errors.name })}>
            <label htmlFor="name">Name</label>
            <div className={styles.inputContainer}>
              <input id="name" {...register('name')} />
            </div>
            <FormError error={errors.name?.message} />
          </div>
          <div className={classNames(styles.formControl, { [styles.invalid]: errors.age })}>
            <label htmlFor="age">Age</label>
            <div className={styles.inputContainer}>
              <input id="age" type="number" {...register('age')} />
            </div>
            <FormError error={errors.age?.message} />
          </div>
          <div className={classNames(styles.formControl, { [styles.invalid]: errors.email })}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputContainer}>
              <input id="email" type="email" {...register('email')} />
            </div>
            <FormError error={errors.email?.message} />
          </div>
          <div className={classNames(styles.formControl, { [styles.invalid]: errors.password })}>
            <label htmlFor="password">Password</label>
            <div className={styles.inputContainer}>
              <input id="password" type="password" {...register('password')} />
            </div>
            <FormError error={errors.password?.message} />
          </div>
          <PasswordStrength password={password} />
          <div className={classNames(styles.formControl, { [styles.invalid]: errors.confirmPassword })}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className={styles.inputContainer}>
              <input id="confirmPassword" type="password" {...register('confirmPassword')} />
            </div>
            <FormError error={errors.confirmPassword?.message} />
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
            <FormError error={errors.gender?.message} />
          </div>
          <div className={classNames(styles.checkbox, { [styles.invalid]: errors.acceptTerms })}>
            <label htmlFor="acceptTerms">
              Accept Terms and Conditions
              <input id="acceptTerms" type="checkbox" {...register('acceptTerms')} />
            </label>
            <FormError error={errors.acceptTerms?.message} />
          </div>
          <div className={classNames(styles.formControl, { [styles.invalid]: errors.picture })}>
            <label htmlFor="profilePicture">Profile Picture</label>
            <div>
              <input id="profilePicture" type="file" accept="image/png, image/jpeg" {...register('picture')} />
            </div>
            <FormError error={errors.picture?.message} />
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
            <FormError error={errors.country?.message} />
          </div>
          <button type="submit" className={styles.submitButton} disabled={!isValid}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default HookForm;
