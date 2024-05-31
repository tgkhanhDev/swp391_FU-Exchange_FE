import React from "react";
import { NavLink } from "react-router-dom";
import { UserOutlined, HistoryOutlined, SwapOutlined, RightOutlined } from '@ant-design/icons';

export const SidebarCustomer = () => {
  return (
    <nav className='w-60 py-10'>
      {/*My Profile */}
      <NavLink to={'/authorize'}>
        <button className='rounded-r-[30px] h-16 grid grid-cols-[1fr_auto] items-center mb-2 w-52 hover:w-full hover:bg-slate-300 duration-500'>
          <div className='flex justify-center items-center pl-5'>
            <div className='ml-2 text-xl'><UserOutlined className="mr-2" />Tài khoản</div>
          </div>
          <div className='flex items-center justify-end pr-5'>
            <RightOutlined className="text-xl" />
          </div>
        </button >
      </NavLink>

      {/*My order*/}
      <NavLink to={'/authorize/order'}>
        <button className='rounded-r-[30px] h-16 grid grid-cols-[1fr_auto] items-center mb-2 cursor-pointer duration-500 w-52 hover:w-full hover:bg-slate-300'>
          <div className='flex justify-center items-center pl-5'>
            <div className='ml-2 text-xl'><HistoryOutlined className="mr-2" />Đơn hàng</div>
          </div>
          <div className='flex items-center justify-end pr-5'>
            <RightOutlined className="text-xl" />
          </div>
        </button >
      </NavLink>

      {/*Transaction History*/}
      <button className='rounded-r-[30px] h-16 grid grid-cols-[1fr_auto] items-center mb-2 cursor-pointer duration-500 w-52 hover:w-full hover:bg-slate-300'>
        <div className='flex justify-center items-center pl-5'>
          <div className='ml-2 text-xl'><SwapOutlined className="mr-2" />Giao dịch</div>
        </div>
        <div className='flex items-center justify-end pr-5'>
          <RightOutlined className="text-xl" />
        </div>
      </button>
    </nav>
  )
}

export default SidebarCustomer