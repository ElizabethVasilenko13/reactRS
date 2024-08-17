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
    resetIsUpdatedByIndex(state, action: PayloadAction<{ index: number; formType: 'uncontrolled' | 'reactHook' }>) {
      const { index, formType } = action.payload;
      if (formType === 'uncontrolled') {
        if (index >= 0 && index < state.uncontrolledFormSubmissions.length) {
          state.uncontrolledFormSubmissions[index] = { ...state.uncontrolledFormSubmissions[index], isUpdated: false };
        }
      } else if (formType === 'reactHook') {
        if (index >= 0 && index < state.reactHookFormSubmissions.length) {
          state.reactHookFormSubmissions[index] = { ...state.reactHookFormSubmissions[index], isUpdated: false };
        }
      }
    },
  },
});

export const { addUncontrolledFormSubmission, addReactHookFormSubmission, resetIsUpdatedByIndex } = formSlice.actions;
export default formSlice.reducer;
