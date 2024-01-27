import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import goods from "./slices/goodsSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        filter,
        cart,
        goods,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
