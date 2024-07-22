import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";
import { StudentInfo } from "../types/user";

export const useAccount = () => {
  const { isAccountRegistered, isAuthorize, isAllowRegister } = useSelector(
    (state: RootState) => state.manageUsers
  );
  const userInfo = localStorage.getItem("userInfo");
  const studentInfo: StudentInfo = userInfo ? JSON.parse(userInfo) : null;

  const staffInfo = localStorage.getItem("staffInfo");
  const staffInfor = staffInfo ? JSON.parse(staffInfo) : null;
  return { isAccountRegistered, isAuthorize, isAllowRegister, studentInfo, staffInfor };
};
