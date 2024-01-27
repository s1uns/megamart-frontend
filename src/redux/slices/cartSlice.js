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
                    item.option.id === action.payload.option.id
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
                    item.option.id === action.payload.option.id
            );

            state.totalPrice =
                Math.round((state.totalPrice - findItem.price) * 100) / 100;
            if (findItem.count !== 1) {
                findItem.count--;
            } else {
                state.items = state.items.filter(
                    (item) =>
                        !(
                            item.id === action.payload.id &&
                            item.option.id === action.payload.option.id
                            )
                );
            }
        },
        removeItem(state, action) {
            const findItem = state.items.find(
                (item) =>
                    item.id === action.payload.id &&
                    item.option.id === action.payload.option.id
            );
            state.totalPrice =
                Math.round(
                    (state.totalPrice - findItem.price * findItem.count) * 100
                ) / 100;
            state.items = state.items.filter(
                (item) =>
                    !(
                        item.id === action.payload.id &&
                        item.option.id === action.payload.option.id
                        )
            );
        },
        cleanCart(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export const selectCart = (state) => state.cart;

export const { addItem, removeItem, cleanCart, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
