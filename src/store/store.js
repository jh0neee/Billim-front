import { configureStore } from '@reduxjs/toolkit';

import emailReducer from './signup';
import searchReducer from './search';
import authReducer from './auth';
import pointReducer from './point';
import pageReducer from './currentPage';
import chatReducer from './chat';

const store = configureStore({
  reducer: {
    email: emailReducer,
    search: searchReducer,
    auth: authReducer,
    point: pointReducer,
    pages: pageReducer,
    chat: chatReducer,
  },
});

export default store;
