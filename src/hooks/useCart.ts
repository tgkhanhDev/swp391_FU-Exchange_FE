import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useCart = () => {
  const { cartList } = useSelector((state: RootState) => state.manageCart);
  return { cartList }; 
};
