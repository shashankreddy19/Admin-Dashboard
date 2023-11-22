import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: 'dark',
    userId : "63701cc1f03239b7f700000e",
};

export const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        setMode: (state) =>
        {
            state.mode = state.mode==='dark' ? 'light' : 'dark'
        },
    },
});

export const { setMode } = mainSlice.actions;
export default mainSlice.reducer;