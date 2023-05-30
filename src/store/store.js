import { configureStore } from "@reduxjs/toolkit";

import emailReducer from "./signup";
import searchReducer from "./search";
import authReducer from "./auth";
import pointReducer from "./point";

const store = configureStore({
  reducer: {
    email: emailReducer,
    search: searchReducer,
    auth: authReducer,
    point: pointReducer,
  },
});

export default store;
