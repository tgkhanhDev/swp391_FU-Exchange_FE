import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useOrder = () => {
  const { order } = useSelector((state: RootState) => state.manageOrders);
  return { order: order || [] };  // Đảm bảo order luôn là một mảng
};
