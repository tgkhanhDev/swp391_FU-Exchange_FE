import React from "react";
import { ShopOutlined, ShoppingCartOutlined, FileOutlined, LogoutOutlined } from '@ant-design/icons';
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export const SidebarModerator = () => {

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="bg-[var(--color-bg-hightlight)] h-full pr-3 fixed top-0 left-0 bottom-0 overflow-y-auto w-1/4">
      <div className="text-lg text-white pt-[20px]">
        <div className="mt-8">

          {/* <NavLink to={'/moderator'}>
            <div className={`pl-[20px] pt-[18px] pb-[18px] flex flex-row rounded-r-full gap-4 duration-200 hover:opacity-85 ${location.pathname === '/moderator' ? 'bg-[var(--color-primary)]' : ''} `}>
              <ShoppingCartOutlined className="text-2xl" />
              <div>Manage Order</div>
            </div>
          </NavLink> */}

          <NavLink to={'/moderator'}>
            <div className={`pl-[20px] pt-[18px] pb-[18px] flex flex-row rounded-r-full gap-4 duration-200 hover:opacity-85 ${location.pathname === '/moderator' ? 'bg-[var(--color-primary)]' : ''} `}>
              <ShopOutlined className="text-2xl" />
              <div>Quản lí bài đăng</div>
            </div>
          </NavLink>

          <NavLink to={'/moderator/reportPost'}>
            <div className={`pl-[20px] pt-[18px] pb-[18px] flex flex-row rounded-r-full gap-4 duration-200 hover:opacity-85 ${location.pathname === '/moderator/reportPost' ? 'bg-[var(--color-primary)]' : ''} `}>
              <FileOutlined className="text-2xl" />
              <div>Quản lí báo cáo bài đăng</div>
            </div>
          </NavLink>

            <button className="pl-[20px] pt-[18px] pb-[18px] flex flex-row rounded-r-full gap-4 duration-500 hover:opacity-85"
            onClick={() => {
              localStorage.removeItem("staffInfo");
              navigate('/');
            }}
            >
              <LogoutOutlined className="text-2xl" />
              <div>Đăng xuất</div>
            </button>

        </div>
      </div>
    </div>
  );
}

export default SidebarModerator;
