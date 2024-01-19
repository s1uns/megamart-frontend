import { configureStore } from "@reduxjs/toolkit"
import filter from "./slices/filterSlice"
import cart from "./slices/cartSlice"
import goods from "./slices/goodsSlice"

export const store = configureStore({
  reducer: {
    filter,
    cart,
    goods
  },
})