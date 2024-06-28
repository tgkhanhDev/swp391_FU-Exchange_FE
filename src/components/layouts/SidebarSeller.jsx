import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LineChartOutlined, SwapOutlined, ProductOutlined, EditOutlined, RightOutlined, LogoutOutlined, InboxOutlined } from '@ant-design/icons';

const SidebarCustomer = () => {
  const location = useLocation(); // Đặt useLocation bên trong thành phần
  const navigate = useNavigate();


  return (
    <nav className='w-64 py-10 sticky top-24 max-h-[calc(100vh)] overflow-auto'>
      {/* My Profile */}
      <NavLink to={'/dashboard'}>
        <button className={`rounded-r-[30px] h-16 grid grid-cols-[1fr_auto] items-center mb-2 w-52 hover:bg-slate-200 ${location.pathname === '/dashboard' ? 'bg-slate-300 w-64' : ''} duration-500`}>
          <div className='flex justify-center items-center pl-5'>
            <div className='ml-2 text-xl'><LineChartOutlined className="mr-2" />Thống kê</div>
          </div>
          <div className='flex items-center justify-end pr-5'>
            <RightOutlined className="text-xl" />
          </div>
        </button>
      </NavLink>

      {/* My order */}
      <NavLink to={'/dashboard/transaction'}>
        <button className={`rounded-r-[30px] h-16 grid grid-cols-[1fr_auto] items-center mb-2 w-52 hover:bg-slate-200 ${location.pathname === '/dashboard/transaction' ? 'bg-slate-300 w-64' : ''} duration-500`}>
          <div className='flex justify-center items-center pl-5'>
            <div className='ml-1 text-xl'><SwapOutlined className="mr-2" />Giao dịch</div>
          </div>
          <div className='flex items-center justify-end pr-5'>
            <RightOutlined className="text-xl" />
          </div>
        </button>
      </NavLink>

      <NavLink to={'/dashboard/wishlist'}>
        <button className={`rounded-r-[30px] h-16 grid grid-cols-[1fr_auto] items-center mb-2 w-52 hover:bg-slate-200 ${location.pathname.includes('/dashboard/wishlist') ? 'bg-slate-300 w-64' : ''} duration-500`}>
          <div className='flex justify-center items-center pl-5'>
            <div className='text-xl'><InboxOutlined className="mr-2" />Chờ tặng</div>
          </div>
          <div className='flex items-center justify-end pr-5'>
            <RightOutlined className="text-xl" />
          </div>
        </button>
      </NavLink>

      <NavLink to={'/dashboard/product'}>
        <button className={`rounded-r-[30px] h-16 grid grid-cols-[1fr_auto] items-center mb-2 w-52 hover:bg-slate-200 ${location.pathname.includes('/dashboard/product') ? 'bg-slate-300 w-64' : ''} duration-500`}>
          <div className='flex justify-center items-center pl-5'>
            <div className='ml-2 text-xl'><ProductOutlined className="mr-2" />Sản phẩm</div>
          </div>
          <div className='flex items-center justify-end pr-5'>
            <RightOutlined className="text-xl" />
          </div>
        </button>
      </NavLink>

      <NavLink to={'/dashboard/post'}>
        <button className={`rounded-r-[30px] h-16 grid grid-cols-[1fr_auto] items-center mb-2 w-52 hover:bg-slate-200 ${location.pathname === '/dashboard/post' ? 'bg-slate-300 w-64' : ''} duration-500`}>
          <div className='flex justify-center items-center pl-5'>
            <div className='text-xl'><EditOutlined className="mr-2" />Bài đăng</div>
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

      <NavLink to={'/authorize'}>
        <div className="flex justify-center items-center mt-20">
          <button className='px-12 py-3 border-2 border-[var(--color-secondary)] text-lg font-semibold relative truncate text-[var(--color-secondary)] hover:text-white duration-100 before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-[var(--color-primary)] before:translate-y-full before:duration-300 before:-z-10 before:hover:-translate-y-0'>
            Trở về
          </button>
        </div>
      </NavLink>
    </nav>
  );
};

export default SidebarCustomer;