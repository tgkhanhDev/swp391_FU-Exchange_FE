import { useSelector } from "react-redux";
import { RootState } from "../store";

export const usePost = () => {
  const { products, posts } = useSelector(
    (state: RootState) => state.manangePost
  );
  return { products, posts };
};
