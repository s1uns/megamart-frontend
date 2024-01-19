import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    items: [],
};

export const goodsSlice = createSlice({
    name: "goods",
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload.items;
        },
    },
});
export const { setItems } = goodsSlice.actions;

export default goodsSlice.reducer;
