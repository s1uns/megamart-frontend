import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const initialState: CartSliceState = {
    totalPrice: 0,
    items: [],
};

export type CartItemObject = {
    id: string;
    title: string;
    option: {
        id: string;
        optionName: string;
    };
    price: number;
    count: number;
    imageUrl: string;
};

interface CartSliceState {
    totalPrice: number;
    items: CartItemObject[];
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItemObject>) {
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
            state.totalPrice = state.items.reduce(
                (price, item) =>
                    Math.round((price + item.price * item.count) * 100) / 100,
                0
            );
        },
        minusItem(state, action: PayloadAction<CartItemObject>) {
            const findItem = state.items.find(
                (item) =>
                    item.id === action.payload.id &&
                    item.option.id === action.payload.option.id
            );

            if (findItem) {
                state.totalPrice =
                    Math.round((state.totalPrice - findItem.price) * 100) / 100;
                findItem.count--;

                // if (findItem.count !== 1) {
                //     findItem.count--;
                // } else {
                //     state.items = state.items.filter(
                //         (item) =>
                //             !(
                //                 item.id === action.payload.id &&
                //                 item.option.id === action.payload.option.id
                //             )
                //     );
                // }
            }
        },
        removeItem(state, action: PayloadAction<CartItemObject>) {
            const findItem = state.items.find(
                (item) =>
                    item.id === action.payload.id &&
                    item.option.id === action.payload.option.id
            );

            if (findItem) {
                state.totalPrice =
                    Math.round(
                        (state.totalPrice - findItem.price * findItem.count) *
                            100
                    ) / 100;
            }

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

export const selectCart = (state: RootState) => state.cart;

export const { addItem, removeItem, cleanCart, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
