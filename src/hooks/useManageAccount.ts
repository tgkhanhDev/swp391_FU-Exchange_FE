import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useManageAccount = () => {
  const { account } =
    useSelector((state: RootState) => state.manageAccount);
  return { account };
};