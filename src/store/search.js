import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    CLICK_SEARCH(state, action) {
      state.searchValue = action.payload;
    },
    CLEAR_SEARCH(state) {
      state.searchValue = null;
    },
  },
});

export const searchAction = searchSlice.actions;
export default searchSlice.reducer;
