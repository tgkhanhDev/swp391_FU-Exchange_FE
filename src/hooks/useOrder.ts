import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useOrder = () => {
  const { order, orderDetail, orderSeller, orderDetailSeller } = useSelector((state: RootState) => state.manageOrders);
  return { order, orderDetail, orderSeller, orderDetailSeller }; 
};
