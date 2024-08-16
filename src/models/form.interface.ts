export interface FormFields {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female' | 'other';
  acceptTerms: boolean;
  image: string;
  country: string;
}

export interface FormSubmission extends FormFields {
  id: string;
  isUpdated: boolean;
}
