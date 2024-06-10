import React, { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserOutlined, HistoryOutlined, RightOutlined, LogoutOutlined } from '@ant-design/icons';

const SidebarCustomer = () => {
  const location = useLocation(); // Đặt useLocation bên trong thành phần
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  })

  return (
    <nav className='w-60 py-10'>
      {/* My Profile */}
      <NavLink to={'/authorize'}>
        <button className={`rounded-r-[30px] h-16 grid grid-cols-[1fr_auto] items-center mb-2 w-52 hover:bg-slate-200 ${location.pathname === '/authorize' ? 'bg-slate-300 w-64' : ''} duration-500`}>
          <div className='flex justify-center items-center pl-5'>
            <div className='ml-2 text-xl'><UserOutlined className="mr-2" />Tài khoản</div>
          </div>
          <div className='flex items-center justify-end pr-5'>
            <RightOutlined className="text-xl" />
          </div>
        </button>
      </NavLink>

      {/* My order */}
      <NavLink to={'/authorize/order'}>
        <button className={`rounded-r-[30px] h-16 grid grid-cols-[1fr_auto] items-center mb-2 w-52 hover:bg-slate-200 ${location.pathname === '/authorize/order' ? 'bg-slate-300 w-64' : ''} duration-500`}>
          <div className='flex justify-center items-center pl-5'>
            <div className='ml-2 text-xl'><HistoryOutlined className="mr-2" />Đơn hàng</div>
          </div>
          <div className='flex items-center justify-end pr-5'>
            <RightOutlined className="text-xl" />
          </div>
        </button>
      </NavLink>

      {userInfo.role === 'Seller' && 
      <NavLink to={''}>
        <button className={`h-16 items-center mb-2 w-52 duration-500`}>
          <div className='flex justify-center items-center pl-5'>
            <div className='ml-2 text-xl'><HistoryOutlined className="mr-2" />Kênh người bán</div>
          </div>
        </button>
      </NavLink>
      }

      {/*Đăng xuất */}
      <button className={`rounded-r-[30px] h-16 items-center mt-5 w-52 hover:bg-slate-200 duration-500`}
        onClick={() => {
          localStorage.removeItem("userInfo");
          navigate('/');
        }}>
        <div className='flex justify-center items-center pr-5'>
          <div className='ml-2 text-xl'><LogoutOutlined className="mr-2" />Đăng xuất</div>
        </div>
      </button>
    </nav>
  );
};

export default SidebarCustomer;