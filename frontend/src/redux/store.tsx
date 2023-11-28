import { configureStore } from '@reduxjs/toolkit';
import modsReducer from './mods';

const store = configureStore({
  reducer: {
    mods: modsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
