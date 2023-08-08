import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  chatRoomId: 0,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    changeMsg: (state, action) => {
      const { message, chatRoomId } = action.payload;
      state.message = message;
      state.chatRoomId = chatRoomId;
    },
  },
});

export const chatAction = chatSlice.actions;
export default chatSlice.reducer;
