import { configureStore } from '@reduxjs/toolkit';
import { trafficLightReducer } from './reducers/trafficLightReducer';
import usersReducer from  '../components/UserTable/users/usersSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    traffic: trafficLightReducer,
  },
});