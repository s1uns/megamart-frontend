import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    searchValue: "",
    categoryId: "",
    sortType: {
        name: "popularity",
        sortProperty: "rating",
    },
    sortOrder: true,
    currentPage: 0,
};

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSearchValue(state, action){
            state.searchValue = action.payload
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
        setFilters(state, action) {
            state.categoryId = action.payload.categoryId;
            state.sortType = action.payload.sortType;
            state.sortOrder = action.payload.sortOrder === "true";
            state.currentPage = Number(action.payload.currentPage);
        },
    },
});
export const {
    setCategoryId,
    setSortType,
    setSortOrder,
    setCurrentPage,
    setFilters,
    setSearchValue
} = filterSlice.actions;

export default filterSlice.reducer;
