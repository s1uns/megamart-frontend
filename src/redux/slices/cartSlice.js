import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    totalPrice: 0,
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(
                (item) =>
                    item.id === action.payload.id &&
                    item.option === action.payload.option
            );
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({ ...action.payload, count: 1 });
            }
            state.totalPrice = state.items
                .reduce(
                    (price, item) =>
                        Math.round((price + item.price * item.count) * 100) /
                        100,
                    0
                )
                .toFixed(2);
        },
        minusItem(state, action) {
            const findItem = state.items.find(
                (item) =>
                    item.id === action.payload.id &&
                    item.option === action.payload.option
            );
            state.totalPrice =
                Math.round((state.totalPrice - findItem.price) * 100) / 100;
            if (findItem.count != 1) {
                findItem.count--;
            } else {
                state.items = state.items.filter(
                    (item) =>
                        !(
                            item.id === action.payload.id &&
                            item.option === action.payload.option
                        )
                );
            }
        },
        removeItem(state, action) {
            const findItem = state.items.find(
                (item) =>
                    item.id === action.payload.id &&
                    item.option === action.payload.option
            );
            state.totalPrice =
                Math.round(
                    (state.totalPrice - findItem.price * findItem.count) * 100
                ) / 100;
            state.items = state.items.filter(
                (item) =>
                    !(
                        item.id === action.payload.id &&
                        item.option === action.payload.option
                    )
            );
        },
        cleanCart(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});
export const { addItem, removeItem, cleanCart, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
