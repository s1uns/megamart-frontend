import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    totalPages: 0,
    status: "processing", // processing | success | failed
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
            `https:localhost:7295/api/goods?page=${currentPage}&limit=5&category=${categoryId}&sortBy=${sortProperty}&sortOrder=${sortOrder}&search=${searchValue}`
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
        setTotalPages(state, action) {
            state.totalPages = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGoods.pending, (state) => {
            state.status = "processing";
            state.items = [];
        });
        builder.addCase(fetchGoods.fulfilled, (state, action) => {
            state.status = "success";
            state.totalPages = action.payload.totalPages;
            state.items = action.payload.data;
        });
        builder.addCase(fetchGoods.rejected, (state) => {
            state.status = "failed";
            state.items = [];
            state.totalPages = 1;
        });
    },
});
export const { setItems } = goodsSlice.actions;

export default goodsSlice.reducer;
