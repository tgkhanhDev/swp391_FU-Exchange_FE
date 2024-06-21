import React, { useEffect, useState } from "react";
import { UserOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from "react-router-dom";
import { useAccount } from "../../hooks/useAccount";
import { useAppDispatch } from "../../store";
import {
  getStaffInfoThunk,
} from "../../store/userManagement/thunk";

export const HeaderStaff = () => {
  const navigate = useNavigate();

  const handleClickLogo = () => {
    if (staffInfor.role === 'Administrator') {
      navigate('/admin');
    } else {
      navigate('/moderator');
    }
  };
  const handleClickProfile = () => {
    if (staffInfor.role === 'Administrator') {
      navigate('/admin/profile');
    } else {
      navigate('/moderator/profile');
    }
  };

  const { staffInfor } = useAccount();
  const dispatch = useAppDispatch();

  const [userInfo, setUserInfo] = useState();

  useEffect(() => {

    if (staffInfor) {
      dispatch(getStaffInfoThunk(
        staffInfor.staffId
      ))
        .then((action) => {
          const { payload } = action;
          setUserInfo(payload);
        })
        .catch((error) => {
          console.error("Error fetching account information:", error);
        });
    }
  }, [dispatch]);

  return (
    <div className="w-full border-b-2 border-gray-300 shadow-lg shadow-gray-400/50 py-5 px-5 sticky top-0 bg-white z-10">
      <div className="flex justify-between items-center">
        <div>
          <button onClick={handleClickLogo}>
            <img className="h-10" src="/images/logos/fu_Ex_logo.png" />
          </button>
        </div>
        <div>
          <marquee className="text-[var(--color-primary)] text-xl font-medium">
            Chào mừng đến với trang quản lí của nền tảng FU-Exchange!
          </marquee>
        </div>
        <button className="flex justify-between items-center gap-x-4" onClick={handleClickProfile}>
          <UserOutlined className="text-2xl" />
          <div className="font-medium text-xl">{userInfo?.staffName}</div>
        </button>
      </div>
    </div>
  );
}

export default HeaderStaff;
