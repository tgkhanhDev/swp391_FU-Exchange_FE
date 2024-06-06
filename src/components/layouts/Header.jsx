import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch } from "../../store";
import { getAccountInfoThunk } from "../../store/userManagement/thunk";

export const Header = () => {

  const [user, setUser] = useState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("userInfo::: ", userInfo);
    setUser(userInfo);

    if (userInfo && userInfo.username) {
      dispatch(getAccountInfoThunk({ studentId: userInfo.username }))
        .then((action) => {
          const { payload } = action;
          const { data } = payload;
          setUser({...userInfo, ...data}); // Kết hợp userInfo và data thành một đối tượng mới
        })
        .catch((error) => {
          console.error("Error fetching account information:", error);
        });
    }
  }, [dispatch]);

  return (
    <header className="top-0 sticky w-full min-w-[950px] z-50">
      {/*Header trên cùng*/}
      <div className="flex justify-between items-center py-3 px-5 text-xl text-[var(--color-primary)] bg-[var(--color-bg-hightlight)]">
        <div className="text-center flex-grow font-semibold">
          Chào mừng đến với FU-Exchange, nơi bạn có thể mua, bán và trao đổi dành cho sinh viên FPT!
        </div>
      </div>
      {/*Header tiếp theo có thanh search*/}
      <div className="py-3 pl-5 pr-20 flex justify-between bg-white border-b-2 border-b-slate-300 ">
        <NavLink to={"/"}>
          <img className="h-10" src="/images/logos/fu_Ex_logo.png" />
        </NavLink>

        {/*Search bar */}
        <div className="flex justify-center items-center">
          <button className="border border-r-0 z-10 p-3 hover:bg-[var(--color-primary)] transition duration-150 rounded-l-[35px] bg-gray-300 filter-white">
            <img
              className="inset-0  w-full h-full object-contain"
              src="/images/icons/search_icon.svg"
            />
          </button>
          <input
            className="h-4 p-5 border border-l-0 rounded-r-[35px] w-[500px] focus:outline-none"
            placeholder="Tìm kiếm"
          ></input>
        </div>

        {/*Giỏ hàng + Login*/}
        <div className="flex justify-center items-center">
          <NavLink to={"/cart"}>
            <ShoppingCartOutlined className='mr-10 cursor-pointer text-3xl' />
          </NavLink>
          {!user && (
            <NavLink to={"/login"}>
              <button className="font-semibold">Đăng nhập</button>
            </NavLink>
          )}
          {user && (
            <button
              className='flex justify-center items-center pl-5'
              onClick={() => {
                localStorage.removeItem("userInfo");
                // window.location.href('/login')
                Navigate("/login");
              }}
            >
              <div className='ml-2 text-xl'><UserOutlined className="mr-4 text-3xl" />{user.firstName} {user.lastName}</div>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
