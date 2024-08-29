
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/Slice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    
  },
})
