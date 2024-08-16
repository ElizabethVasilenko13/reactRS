import * as Yup from 'yup';

export const formValidationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[A-Z][a-zA-Z\s]*$/, 'Name must start with an uppercase letter and contai only letters'),
  age: Yup.number()
    .required('Age is required')
    .typeError('Age must be a number')
    .positive('Age must be a positive number')
    .integer('Age must be an integer'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[0-9]/, 'Password must contain a number')
    .matches(/[\W_]/, 'Password must contain a special character'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  gender: Yup.string().required('Gender is required').oneOf(['male', 'female', 'other'], 'Invalid gender'),
  acceptTerms: Yup.boolean()
    .required('Terms and conditions must be accepted')
    .oneOf([true], 'You must accept the terms and conditions'),
  picture: Yup.mixed<FileList>()
    .required('Picture is required')
    .test('extension', 'Image required', (value) => {
      return value.length >= 1;
    })
    .test('fileSize', 'This file is too large', (value) => {
      return value && value.length > 0 && value[0].size <= 2000000;
    })
    .test('fileType', 'Only .jpeg and .png formats are accepted', (value) => {
      return value && value.length > 0 && ['image/jpeg', 'image/png'].includes(value[0].type);
    }),
  country: Yup.string().required('Country is required'),
});
