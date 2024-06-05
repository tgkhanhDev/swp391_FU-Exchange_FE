import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserOutlined, HistoryOutlined, SwapOutlined, RightOutlined } from '@ant-design/icons';

const SidebarCustomer = () => {
  const location = useLocation(); // Đặt useLocation bên trong thành phần

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

      {/* Transaction History */}
      <button className={`rounded-r-[30px] h-16 grid grid-cols-[1fr_auto] items-center mb-2 w-52 hover:bg-slate-200 ${location.pathname === '' ? 'bg-slate-300 w-64' : ''} duration-500`}>
        <div className='flex justify-center items-center pl-5'>
          <div className='ml-2 text-xl'><SwapOutlined className="mr-2" />Giao dịch</div>
        </div>
        <div className='flex items-center justify-end pr-5'>
          <RightOutlined className="text-xl" />
        </div>
      </button>
    </nav>
  );
};

export default SidebarCustomer;