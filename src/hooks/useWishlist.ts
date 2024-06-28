import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useWishlist = () => {
  const { view } =
    useSelector((state: RootState) => state.manageWishlist);
  return { view };
};