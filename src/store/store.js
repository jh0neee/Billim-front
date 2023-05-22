import { configureStore } from "@reduxjs/toolkit";

import emailReducer from "./signup";
import searchReducer from "./search";
import authReducer from "./auth";

const store = configureStore({
  reducer: { email: emailReducer, search: searchReducer, auth: authReducer},
});

export default store;
