import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import feedReducer from './feedSlice';
import connectionsReducer from './connectionSlice';
import connectionRequestReducer from './requestSlice';
const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionsReducer,
    connectionRequests: connectionRequestReducer,
  },
});

export default appStore;
