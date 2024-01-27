import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


export enum Status {
    PROCESSING = "processing",
    SUCCESS = "success",
    FAILED = "failed"
}
export type Filters = {
    currentPage: number;
    categoryId: string;
    sortProperty: string;
    sortOrder: boolean;
    searchValue: string;
};
type Good = {
    id: string;
    name: string;
    description: string;
    price: number;
    imgUrl: string;
    sellerName: string;
    goodOptions: {
        id: string;
        optionName: string;
    }[];
};

type GoodsResponse = {
    data: Good[];
    totalPages: number;
};

interface GoodsSliceState {
    items: Good[];
    totalPages: number;
    status: Status;
}

const initialState: GoodsSliceState = {
    items: [],
    totalPages: 0,
    status: Status.PROCESSING, // processing | success | failed
};

export const fetchGoods = createAsyncThunk<GoodsResponse, Filters>(
    "goods/fetchGoods",
    async (params) => {
        const {
            currentPage,
            categoryId,
            sortProperty,
            sortOrder,
            searchValue,
        } = params;
        const { data } = await axios.get<GoodsResponse>(
            `https:localhost:7295/api/goods?page=${currentPage}&limit=8&category=${categoryId}&sortBy=${sortProperty}&sortOrder=${sortOrder}&search=${searchValue}`
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
            state.status = Status.PROCESSING;
            state.items = [];
        });
        builder.addCase(
            fetchGoods.fulfilled,
            (state, action: PayloadAction<GoodsResponse>) => {
                state.status = Status.SUCCESS;
                state.items = action.payload.data;
                state.totalPages = action.payload.totalPages;
            }
        );
        builder.addCase(fetchGoods.rejected, (state) => {
            state.status = Status.FAILED;
            state.items = [];
            state.totalPages = 1;
        });
    },
});
export const { setItems } = goodsSlice.actions;

export default goodsSlice.reducer;
