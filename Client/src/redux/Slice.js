
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) ?? null,
  isAdmin: JSON.parse(localStorage.getItem('isAdmin')) ?? false,
  
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // If payload is a single user, add it directly
      
    
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
     
      state.isAdmin = false;
      localStorage.removeItem('user');
      localStorage.removeItem('isAdmin');
    },
    setAdmin: (state, action) => {
      state.isAdmin = action.payload;
      localStorage.setItem('isAdmin', JSON.stringify(action.payload));
    },
  },
});

export const { setUser, clearUser, setAdmin } = userSlice.actions;
export default userSlice.reducer;

