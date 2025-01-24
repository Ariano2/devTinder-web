import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: 'dark',
  reducers: {
    toggleTheme: (state) => {
      if (state === 'dark') return 'light';
      return 'dark';
    },
  },
});

export default themeSlice.reducer;

export const { toggleTheme } = themeSlice.actions;
