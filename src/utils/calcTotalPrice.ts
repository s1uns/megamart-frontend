import { CartItemObject } from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: CartItemObject[]) => {
    return items.reduce(
        (price, item) =>
            Math.round((price + item.price * item.count) * 100) / 100,
        0
    );
};
