import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useProduct = () => {
  const { productView, productQuantity, createProductRes, wareHouse, payCart } =
    useSelector((state: RootState) => state.manageProduct);
  return { productView, productQuantity, createProductRes, wareHouse, payCart };
};
