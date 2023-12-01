import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  username: string | undefined,
  isStaff: boolean,
}

const initialState: AuthState = {
  username: undefined,
  isStaff: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{
      username: string,
      isStaff: boolean,
    }>) => {
      state.username = action.payload.username;
      state.isStaff = action.payload.isStaff;
    },
    logout: (state) => {
      state.username = undefined;
      state.isStaff = false;
    },
  }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
