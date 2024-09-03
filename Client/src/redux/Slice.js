import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: (() => {
    const storedUser = localStorage.getItem('user');
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null; // If parsing fails, return null
    }
  })(),
  
  isAdmin: (() => {
    const storedIsAdmin = localStorage.getItem('isAdmin');
    try {
      return storedIsAdmin ? JSON.parse(storedIsAdmin) : false;
    } catch {
      return false; // If parsing fails, return false
    }
  })(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
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
