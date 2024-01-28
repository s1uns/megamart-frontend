import { CartItemObject } from "../redux/slices/cartSlice";

export const calcTotalCount = (items: CartItemObject[]) => {
    return items.reduce((count: number, item: any) => count + item.count, 0);
};
