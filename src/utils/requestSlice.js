import { createSlice } from '@reduxjs/toolkit';

const requestSlice = createSlice({
  name: 'connectionRequests',
  initialState: null,
  reducers: {
    addConnectionRequests: (state, action) => action.payload,
    removeConnectionRequest: (state, action) => {
      const newState = state.filter((r) => r._id !== action.payload);
      return newState;
    },
  },
});

export const { addConnectionRequests, removeConnectionRequest } =
  requestSlice.actions;
export default requestSlice.reducer;
