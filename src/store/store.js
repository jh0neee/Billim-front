import { configureStore } from "@reduxjs/toolkit";

import emailReducer from "./signup";
import searchReducer from "./search";

const store = configureStore({
  reducer: { email: emailReducer, search: searchReducer },
});

export default store;
