import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useReview = () => {
  const { review } =
    useSelector((state: RootState) => state.manageReview);
  return { review };
};