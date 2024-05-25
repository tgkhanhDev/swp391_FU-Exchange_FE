import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useView = () => {
  const { campus } = useSelector(
    (state: RootState) => state.manageView
  );
  return { campus };
};
