import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    token: null,
    memberId: null,
  },
  reducers: {
    LOGIN(state, action) {
      const { token, memberId } = action.payload;
      state.isLoggedIn = true;
      state.token = token;
      state.memberId = memberId;
    },
    LOGOUT(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.memberId = null;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
