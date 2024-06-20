import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";

export const useAccount = () => {
  const { isAccountRegistered, isAuthorize, isAllowRegister } = useSelector(
    (state: RootState) => state.manageUsers
  );
  const userInfo = localStorage.getItem("userInfo");
  const studentInfo = userInfo ? JSON.parse(userInfo) : null;

  return { isAccountRegistered, isAuthorize, isAllowRegister, studentInfo };
};
