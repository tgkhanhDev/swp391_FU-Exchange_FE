import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch } from "../../store";
import { getAccountInfoThunk } from "../../store/userManagement/thunk";
import { Dropdown, Menu } from 'antd';
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

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      localStorage.removeItem('userInfo');
      navigate('/');
      window.location.reload();
    } else {
      navigate(key);
    }
  };

  const userMenu = (
    <Menu onClick={handleMenuClick} className="w-44 custome-font">
      <Menu.Item key="/authorize">Tài khoản</Menu.Item>
      <Menu.Item key="/authorize/order">Đơn hàng</Menu.Item>
      {userInfo && userInfo.role === 'Seller' && (
        <Menu.SubMenu key="seller" title="Quản lý bán hàng">
          <Menu.Item key="/dashboard" className="custome-font-child">Thống kê</Menu.Item>
          <Menu.Item key="/dashboard/g" className="custome-font-child">Giao dịch</Menu.Item>
          <Menu.Item key="/dashboard/product" className="custome-font-child">Sản phẩm</Menu.Item>
          <Menu.Item key="/dashboard/b" className="custome-font-child">Bài đăng</Menu.Item>
        </Menu.SubMenu>
      )}
      <Menu.Item key="logout">Đăng xuất</Menu.Item>
    </Menu>
  );

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (userInfo && userInfo.username) {
      dispatch(getAccountInfoThunk({ studentId: userInfo.username }))
        .then((action) => {
          const { payload } = action;
          const { data } = payload;
          setUser({ ...userInfo, ...data });
        })
        .catch((error) => {
          console.error("Error fetching account information:", error);
        });
    }
  }, [dispatch]);

  return (
    <header className="top-0 sticky w-full min-w-[950px] z-50">
      <div className="flex justify-between items-center py-3 px-2 text-xl text-[var(--color-primary)] bg-[var(--color-bg-hightlight)]">
        <div className="text-center flex-grow font-semibold">
          Chào mừng đến với FU-Exchange, nơi bạn có thể mua, bán và trao đổi dành cho sinh viên FPT!
        </div>
      </div>
      <div className="py-3 pl-5 pr-20 flex justify-between bg-white border-b-2 border-b-slate-300 ">
        <NavLink to={"/"}>
          <img className="h-10" src="/images/logos/fu_Ex_logo.png" />
        </NavLink>

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
            <Dropdown overlay={userMenu} trigger={['click']} overlayClassName="custom-arrow custome-font" placement="bottomLeft" arrow>
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
