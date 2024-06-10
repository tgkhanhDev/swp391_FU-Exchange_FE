import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useProduct = () => {
  const { products } = useSelector(
    (state: RootState) => state.manageProduct
  );
  return { products };
};
