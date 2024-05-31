import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useAccount = () => {
  const { isAccountRegistered, isAuthorize, isAllowRegister } = useSelector(
    (state: RootState) => state.manageUsers
  );
  return { isAccountRegistered, isAuthorize, isAllowRegister };
};