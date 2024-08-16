import { FormFields, FormSubmission } from '@models/form.interface';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '@store/store';
import { formValidationSchema } from '@validation/form.validator';
import { convertImageToBase64 } from '@utils/image-convert';
import { addReactHookFormSubmission } from '@store/form/form.slice';
import { Link, useNavigate } from 'react-router-dom';

const HookForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { countries } = useAppSelector((state) => state.countries);

  const {
    register,
    handleSubmit,
    formState: { errors },
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
    <div>
      <Link to="/"> Main</Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" {...register('name')} />
          {errors.name && <div>{errors.name.message}</div>}
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input id="age" type="number" {...register('age')} />
          {errors.age && <div>{errors.age.message}</div>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email')} />
          {errors.email && <div>{errors.email.message}</div>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register('password')} />
          {errors.password && <div>{errors.password.message}</div>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input id="confirmPassword" type="password" {...register('confirmPassword')} />
          {errors.confirmPassword && <div>{errors.confirmPassword.message}</div>}
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <select id="gender" {...register('gender')}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <div>{errors.gender.message}</div>}
        </div>
        <div>
          <label htmlFor="acceptTerms">
            <input id="acceptTerms" type="checkbox" {...register('acceptTerms')} />
            Accept Terms and Conditions
          </label>
          {errors.acceptTerms && <div>{errors.acceptTerms.message}</div>}
        </div>
        <div>
          <label htmlFor="profilePicture">Profile Picture</label>
          <input id="profilePicture" type="file" accept="image/png, image/jpeg" {...register('picture')} />
          {errors.picture && <div>{errors.picture.message}</div>}
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input id="country" list="countryList" {...register('country')} />
          <datalist id="countryList">
            {countries.map((country, index) => (
              <option key={index} value={country} />
            ))}
          </datalist>
          {errors.country && <div>{errors.country.message}</div>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HookForm;
