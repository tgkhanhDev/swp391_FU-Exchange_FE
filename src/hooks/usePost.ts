import { useSelector } from "react-redux";
import { RootState } from "../store";

export const usePost = () => {
  const { products, posts, postDetail, postView } = useSelector(
    (state: RootState) => state.manangePost
  );
  return { products, posts, postDetail, postView };
};
