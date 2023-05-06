import { configureStore } from "@reduxjs/toolkit";

import emailReducer from "./signup";

const store = configureStore({
  reducer: { email: emailReducer },
});

export default store;
