import { useSelector } from "react-redux";
import { RootState } from "../store";
import { cartItem, cartItemFilter } from "../types/cart";

export const useCart = () => {
  const { cartList, cartListFilter } = useSelector(
    (state: RootState) => state.manageCart
  ); 

  return { cartList, cartListFilter };
};
