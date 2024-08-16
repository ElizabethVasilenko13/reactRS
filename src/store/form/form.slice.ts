import { FormSubmission } from '@models/form.interface';
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
    addUncontrolledFormSubmission(state, action: PayloadAction<FormSubmission>) {
      state.uncontrolledFormSubmissions.forEach((submission) => {
        submission.isUpdated = false;
      });
      state.uncontrolledFormSubmissions.push(action.payload);
    },
    addReactHookFormSubmission(state, action: PayloadAction<FormSubmission>) {
      state.reactHookFormSubmissions.forEach((submission) => {
        submission.isUpdated = false;
      });
      state.reactHookFormSubmissions.push(action.payload);
    },
  },
});

export const { addUncontrolledFormSubmission, addReactHookFormSubmission } = formSlice.actions;
export default formSlice.reducer;
