import * as Yup from 'yup';

export const formValidationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Z][a-zA-Z]*$/, 'Name must start with an uppercase letter')
    .required('Name is required'),
  age: Yup.number()
    .typeError('Age must be a number')
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .required('Age is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[0-9]/, 'Password must contain a number')
    .matches(/[\W_]/, 'Password must contain a special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  gender: Yup.string().oneOf(['male', 'female', 'other'], 'Invalid gender').required('Gender is required'),
  acceptTerms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('Terms and conditions must be accepted'),
  picture: Yup.mixed<FileList>()
    .required('Picture is required')
    .test('pictureSize', 'This file is too large', (value) => {
      if (!value.length) return false;

      return value && value[0].size <= 200000;
    })
    .test('extension', 'Image required', (value) => {
      return value.length >= 1;
    })
    .test('extension', 'Only the .jpeg, .png formats are accepted', (value) => {
      if (!value.length) return false;
      return value && (value[0].type === 'image/jpeg' || value[0].type === 'image/png');
    }),
  country: Yup.string().required('Country is required'),
});
