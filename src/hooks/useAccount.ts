import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useAccount = () => {
  const { isAccountRegistered, loginRes } = useSelector(
    (state: RootState) => state.manageUsers
  );
  return { isAccountRegistered, loginRes };
};