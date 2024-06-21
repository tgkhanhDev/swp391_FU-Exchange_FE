import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useCart = () => {
  const { viewCart } = useSelector((state: RootState) => state.manageCart);
  return { viewCart }; 
};
