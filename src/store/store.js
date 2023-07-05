import { configureStore } from '@reduxjs/toolkit';

import emailReducer from './signup';
import searchReducer from './search';
import authReducer from './auth';
import pointReducer from './point';
import pageReducer from './currentPage';

const store = configureStore({
  reducer: {
    email: emailReducer,
    search: searchReducer,
    auth: authReducer,
    point: pointReducer,
    pages: pageReducer,
  },
});

export default store;
