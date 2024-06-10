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
    <nav className='w-64 py-10 sticky top-24 max-h-[calc(100vh)] overflow-auto'>
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

      {userInfo.role === 'Seller' &&
        <NavLink to={''}>
          <div className="flex justify-center items-center mt-40">
            <button className='px-8 py-3 border-2 border-[var(--color-secondary)] text-lg font-semibold relative truncate text-[var(--color-secondary)] hover:text-white duration-100 before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-[var(--color-primary)] before:-translate-x-full before:duration-300 before:-z-10 before:hover:translate-x-0 '>
              Kênh người bán
            </button>
          </div>
        </NavLink>
      }
    </nav>
  );
};

export default SidebarCustomer;