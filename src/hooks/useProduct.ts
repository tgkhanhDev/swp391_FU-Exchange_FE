import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useProduct = () => {
  const { productView, productQuantity, product } = useSelector(
    (state: RootState) => state.manageProduct
  );
  return { productView, productQuantity, product};
};
