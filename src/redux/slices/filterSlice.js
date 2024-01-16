import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: "",
    sortType: {
        name: "popularity",
        sortProperty: "rating",
    },
    sortOrder: true,
};

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSortType(state, action) {
            console.log(action.payload);
            state.sortType = action.payload;
        },
        setSortOrder(state, action) {
            console.log(action.payload);
            state.sortOrder = action.payload;
        },
    },
});
export const { setCategoryId, setSortType, setSortOrder } = filterSlice.actions;

export default filterSlice.reducer;
