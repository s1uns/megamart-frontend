import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type SortType = {
    name: string;
    sortProperty: "rating" | "price" | "title";
};

interface IFilterSliceState {
    searchValue: string;
    categoryId: string;
    sortType: SortType;
    sortOrder: boolean;
    currentPage: number;
}

export const initialState: IFilterSliceState = {
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
        setCategoryId(state, action: PayloadAction<string>) {
            state.categoryId = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setSortType(state, action: PayloadAction<SortType>) {
            state.sortType = action.payload;
        },
        setSortOrder(state, action: PayloadAction<boolean>) {
            state.sortOrder = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<IFilterSliceState>) {
            state.categoryId = action.payload.categoryId;
            state.sortType = action.payload.sortType;
            state.sortOrder = action.payload.sortOrder.toString() === "true";
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
    setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
