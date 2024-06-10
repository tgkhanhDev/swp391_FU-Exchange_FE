import React, { useEffect, useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch } from "../../store";
import { getAccountInfoThunk } from "../../store/userManagement/thunk";
import { Dropdown } from 'antd';
import "./styles.css";

export const Header = () => {

  const [user, setUser] = useState();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [searchName, setSearchName] = useState("");

  const handleSearchName = () => {
    if (searchName.trim() !== "") {
      navigate(`/detail?search=${encodeURIComponent(searchName)}`);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearchName();
    }
  }

  const options = [
    { value: '/authorize', label: 'Tài khoản' },
    { value: '/authorize/order', label: 'Đơn hàng' },
    { value: 'logout', label: 'Đăng xuất' },
  ];

  if (userInfo && userInfo.role === 'Seller') {
    options.splice(2, 0, { value: '/dashboard', label: 'Quản lý bán hàng' });
    //chèn vào ở vị trí thứ 2 mà không xóa value nào
  }

  const handleMenuClick = (key) => {
    console.log(key);
    if (key === 'logout') {
      // Xử lý logout ở đây (xóa token, dọn dẹp local storage, vv.)
      localStorage.removeItem('userInfo');
      navigate('/');
      window.location.reload();
    } else {
      navigate(key);
    }
  };

  const Menu = () => (
    <div className="text-lg bg-[var(--color-primary)] shadow-lg rounded-sm overflow-hidden text-white w-48">
      {options.map(option => (
        <button
          key={option.value}
          className="block w-full px-4 py-2 text-left duration-150 hover:text-[#4db748] hover:bg-white"
          onClick={() => handleMenuClick(option.value)} 
        >
          {option.label}
        </button>
      ))}
    </div>
  );

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("userInfo::: ", userInfo);
    setUser(userInfo);

    if (userInfo && userInfo.username) {
      dispatch(getAccountInfoThunk({ studentId: userInfo.username }))
        .then((action) => {
          const { payload } = action;
          const { data } = payload;
          setUser({ ...userInfo, ...data }); // Kết hợp userInfo và data thành một đối tượng mới
        })
        .catch((error) => {
          console.error("Error fetching account information:", error);
        });
    }
  }, [dispatch]);

  return (
    <header className="top-0 sticky w-full min-w-[950px] z-50">
      {/*Header trên cùng*/}
      <div className="flex justify-between items-center py-3 px-2 text-xl text-[var(--color-primary)] bg-[var(--color-bg-hightlight)]">
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
          <button className="border border-r-0 z-10 p-3 hover:bg-[var(--color-primary)] transition duration-150 rounded-l-[35px] bg-gray-300 filter-white" onClick={handleSearchName}>
            <img
              className="inset-0  w-full h-full object-contain"
              src="/images/icons/search_icon.svg"
            />
          </button>
          <input
            className="h-4 p-5 border border-l-0 rounded-r-[35px] w-[700px] focus:outline-none"
            placeholder="Tìm kiếm"
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            onKeyDown={handleKey}
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
            <Dropdown dropdownRender={() => <Menu />} trigger={['click']} overlayClassName="custom-arrow" arrow >
              <button className='flex justify-between items-center pl-5'>
                <div className="flex justify-center items-center text-xl">
                  <UserOutlined className="mr-4 text-3xl" />
                  {user.firstName} {user.lastName}
                </div>
              </button>
            </Dropdown>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
