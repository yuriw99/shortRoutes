import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  password: string;
}

const initialState: AppState = {
  password: 'initial value',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAllPagePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
});

export const { setAllPagePassword } = appSlice.actions;
export default appSlice.reducer;
