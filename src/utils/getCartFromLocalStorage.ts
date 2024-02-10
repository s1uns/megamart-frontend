import { CartItemObject } from "../redux/slices/cartSlice";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLocalStorage = () => {
    const localCartData = localStorage.getItem("cart");
    const items = localCartData ? JSON.parse(localCartData) : [];
    const totalPrice = calcTotalPrice(items);
    return {
        items: items as CartItemObject[],
        totalPrice,
    };
};
