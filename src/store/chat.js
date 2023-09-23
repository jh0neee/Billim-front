import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    roomId: 0,
  },
  reducers: {
    updateRoomId: (state, action) => {
      state.roomId = action.payload;
    },
  },
});

export const chatAction = chatSlice.actions;
export default chatSlice.reducer;
