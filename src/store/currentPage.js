import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: '',
};

const pageSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const pageAction = pageSlice.actions;
export default pageSlice.reducer;
