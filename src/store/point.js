import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  remainingPoint: 0,
  usagePoint: 0,
}

const pointSlice = createSlice({
  name: "point",
  initialState,
  reducers: {
    updatePoints: (state, action) => {
      state.remainingPoint = action.payload;
    },
    usePoints: (state, action) => {
      state.usagePoint = action.payload;
      state.remainingPoint -= state.usagePoint;
    },
  }
});

export const pointAction = pointSlice.actions;
export default pointSlice.reducer;