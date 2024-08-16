import { FormFields, FormSubmission } from '@models/form.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  uncontrolledFormSubmissions: FormSubmission[];
  reactHookFormSubmissions: FormSubmission[];
}

const initialState: FormState = {
  uncontrolledFormSubmissions: [],
  reactHookFormSubmissions: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addUncontrolledFormSubmission(state, action: PayloadAction<FormFields>) {
      state.uncontrolledFormSubmissions.forEach((submission) => {
        submission.isUpdated = false;
      });

      const newSubmission: FormSubmission = {
        ...action.payload,
        id: Date.now().toString(),
        isUpdated: true,
      };
      state.uncontrolledFormSubmissions.push(newSubmission);
    },
    addReactHookFormSubmission(state, action: PayloadAction<FormFields>) {
      state.reactHookFormSubmissions.forEach((submission) => {
        submission.isUpdated = false;
      });

      const newSubmission: FormSubmission = {
        ...action.payload,
        id: Date.now().toString(),
        isUpdated: true,
      };
      state.reactHookFormSubmissions.push(newSubmission);
    },
  },
});

export const { addUncontrolledFormSubmission, addReactHookFormSubmission } = formSlice.actions;
export default formSlice.reducer;
