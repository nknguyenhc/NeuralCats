import { configureStore } from '@reduxjs/toolkit';
import modsReducer from './mods';
import authReducer from './auth';

const store = configureStore({
  reducer: {
    mods: modsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
