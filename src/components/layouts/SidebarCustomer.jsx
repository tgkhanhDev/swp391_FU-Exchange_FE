import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export const SidebarCustomer = () => {
  const [activeComponent, setActiveComponent] = useState(null); // Sử dụng một biến activeDiv để lưu trữ div hiện đang active
  let againClick = null;

  const handleClick = (Id) => {
    // Tạo một hàm xử lý với tham số divId để xác định div nào được nhấp
    if (activeComponent === Id) {
      // Kiểm tra nếu div nhấp đã active thì chuyển sang không active
      if (againClick === Id) {
        //Kiểm tra xem div đã nhấp có trùng với div trước đó đang active hay không
        setActiveComponent(Id); //Nếu có, đặt nó là active
        return;
      }
    } else {
      //nếu không
      againClick = null;
      setActiveComponent(Id); // Nếu không, đặt div đó là active
    }
  };
  return (
    <nav className="w-60 py-10">
      {/*My Profile */}
      <NavLink to={"/authorize"}>
        <button className="rounded-r-[30px] h-16 grid grid-cols-[1fr_auto] items-center mb-2 w-52 hover:w-full hover:bg-slate-300 duration-500">
          <div className="flex justify-center items-center pl-5">
            <div className="ml-2 text-xl">
              <UserOutlined className="mr-2" />
              Tài khoản
            </div>
          </div>
          <div className="flex items-center justify-end pr-5">
            <RightOutlined className="text-xl" />
          </div>
        </button>
      </NavLink>

      {/*My order*/}
      <NavLink to={"/authorize/order"}>
        <button className="rounded-r-[30px] h-16 grid grid-cols-[1fr_auto] items-center mb-2 cursor-pointer duration-500 w-52 hover:w-full hover:bg-slate-300">
          <div className="flex justify-center items-center pl-5">
            <div className="ml-2 text-xl">
              <HistoryOutlined className="mr-2" />
              Đơn hàng
            </div>
          </div>
          <div className="flex items-center justify-end pr-5">
            <RightOutlined className="text-xl" />
          </div>
        </button>
      </NavLink>

      {/*Transaction History*/}
      <button className="rounded-r-[30px] h-16 grid grid-cols-[1fr_auto] items-center mb-2 cursor-pointer duration-500 w-52 hover:w-full hover:bg-slate-300">
        <div className="flex justify-center items-center pl-5">
          <div className="ml-2 text-xl">
            <SwapOutlined className="mr-2" />
            Giao dịch
          </div>
        </div>
        <div className="flex items-center justify-end pr-5">
          <RightOutlined className="text-xl" />
        </div>
      </button>
    </nav>
  );
};

export default SidebarCustomer;
