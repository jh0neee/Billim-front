import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchItems: [],
  isSearching: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    CLICK_SEARCH(state, action) {
      const { inputValue, search, item } = action.payload;
      state.isSearching = search;
      state.searchItems = item.filter(item =>
        item.name.toLowerCase().includes(inputValue.toLowerCase()),
      );
    },
    CLEAR_SEARCH(state, action) {
      state.isSearching = action.payload;
    },
  },
});

export const searchAction = searchSlice.actions;
export default searchSlice.reducer;
