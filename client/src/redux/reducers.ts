import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
    email: string,
    password: string;
}

const initialState: AppState = {
    email: 'initial email',
    password: 'initial password',
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAllPagePassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setAllPageEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },

    },
});

export const { setAllPageEmail, setAllPagePassword } = appSlice.actions;
export default appSlice.reducer;
