import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModType = {
  fullname: string,
  code: string,
}

type ModState = {
  mods: Array<ModType>,
}

const initialState: ModState = {
  mods: [],
}

export const counterSlice = createSlice({
  name: 'mods',
  initialState,
  reducers: {
    setMods: (state, action: PayloadAction<Array<ModType>>) => {
      state.mods = action.payload;
    },
  },
});

export const { setMods } = counterSlice.actions

export default counterSlice.reducer
