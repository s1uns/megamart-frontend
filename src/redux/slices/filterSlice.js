import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: "",
    sortType: {
        name: "popularity",
        sortProperty: "rating",
    },
    sortOrder: true,
    currentPage: 0
};

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSortType(state, action) {
            state.sortType = action.payload;
        },
        setSortOrder(state, action) {
            state.sortOrder = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
    },
});
export const { setCategoryId, setSortType, setSortOrder, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
