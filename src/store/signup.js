import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  domain: '',
};

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    EMAIL_INPUT_CHANGE(state, action) {
      const { inputValue, selectedOpt } = action.payload;
      state.email = inputValue;
      state.domain = selectedOpt;
    },
  },
});

export const emailAction = emailSlice.actions;
export default emailSlice.reducer;
