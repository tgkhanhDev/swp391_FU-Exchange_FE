import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export const SidebarCustomer = () => {
  const [activeComponent, setActiveComponent] = useState(null); // Sử dụng một biến activeDiv để lưu trữ div hiện đang active
  let againClick = null;

  const handleClick = (Id) => { // Tạo một hàm xử lý với tham số divId để xác định div nào được nhấp
    if (activeComponent === Id) { // Kiểm tra nếu div nhấp đã active thì chuyển sang không active
      if (againClick === Id) {  //Kiểm tra xem div đã nhấp có trùng với div trước đó đang active hay không
        setActiveComponent(Id);  //Nếu có, đặt nó là active 
        return;
      }
    } else {  //nếu không
      againClick = null;
      setActiveComponent(Id); // Nếu không, đặt div đó là active
    }
  };
  return (
    <nav className='w-60 py-10'>
      {/*My Profile */}
      <NavLink to={'/authorize'}>
        <button className={`rounded-r-[30px] h-16 grid grid-cols-[1fr_auto] items-center mb-2 cursor-pointer hover:bg-slate-200 hover:w-56 duration-500 ${activeComponent === 1 ? 'sidebar-component' : 'sidebar-component-normal'}`} onClick={() => handleClick(1)}>
          <div className='flex justify-center items-center pl-5'>
            <img src='/images/icons/user_icon.svg' className='w-5 h-5'></img>
            <div className='ml-2 text-xl'>Tài khoản</div>
          </div>
          <div className='flex items-center justify-end pr-5'>
            <img src='/images/icons/triangle_pointer_icon.svg' className='w-5 h-5'></img>
          </div>
        </button >
      </NavLink>

      {/*My order*/}
      <button className={`rounded-r-[30px] h-16 grid grid-cols-[1fr_auto] items-center mb-2 cursor-pointer hover:bg-slate-200 hover:w-56 duration-500 ${activeComponent === 2 ? 'sidebar-component' : 'sidebar-component-normal'}`} onClick={() => handleClick(2)}>
        <div className='flex justify-center items-center pl-5'>
          <img src='/images/icons/history.svg' className='w-5 h-5'></img>
          <div className='ml-2 text-xl'>Đơn hàng</div>
        </div>
        <div className='flex items-center justify-end pr-5'>
          <img src='/images/icons/triangle_pointer_icon.svg' className='w-5 h-5'></img>
        </div>
      </button >
      {/*Transaction History*/}
      <button className={`rounded-r-[30px] h-16 grid grid-cols-[1fr_auto] items-center mb-2 cursor-pointer hover:bg-slate-200   hover:w-56 duration-500 ${activeComponent === 3 ? 'sidebar-component' : 'sidebar-component-normal'}`} onClick={() => handleClick(3)}>
        <div className='flex justify-center items-center pl-5'>
          <img src='/images/icons/transaction.svg' className='w-5 h-5'></img>
          <div className='ml-2 text-xl'>Giao dịch</div>
        </div>
        <div className='flex items-center justify-end pr-5'>
          <img src='/images/icons/triangle_pointer_icon.svg' className='w-5 h-5 justify-end'></img>
        </div>
      </button>
    </nav>
  )
}

export default SidebarCustomer