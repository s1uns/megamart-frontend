import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
};

export const fetchGoods = createAsyncThunk(
    "goods/fetchGoods",
    async (params) => {
        const {
            currentPage,
            categoryId,
            sortProperty,
            sortOrder,
            searchValue,
        } = params;
        const { data } = await axios.get(
            `https:localhost:7295/api/goods/list?page=${currentPage}&limit=5&category=${categoryId}&sortBy=${sortProperty}&sortOrder=${sortOrder}&search=${searchValue}`
        );
        return data;
    }
);

export const goodsSlice = createSlice({
    name: "goods",
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGoods.fulfilled, (state, action) => {
        });
    },
});
export const { setItems } = goodsSlice.actions;

export default goodsSlice.reducer;
