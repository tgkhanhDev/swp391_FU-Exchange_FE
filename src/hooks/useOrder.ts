import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useOrder = () => {
  const { order, orderSeller, orderDetailSeller} = useSelector((state: RootState) => state.manageOrders);
  return { order, orderSeller, orderDetailSeller}; 
};
