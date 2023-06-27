import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    token: null,
  },
  reducers: {
    LOGIN(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    LOGOUT(state) {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
