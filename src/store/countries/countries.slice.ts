import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CountryState {
  countries: string[];
}

const initialState: CountryState = {
  countries: [],
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountries(state, action: PayloadAction<string[]>) {
      state.countries = action.payload;
    },
  },
});

export const { setCountries } = countriesSlice.actions;
export default countriesSlice.reducer;
