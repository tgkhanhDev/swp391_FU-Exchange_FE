import React from "react";
import { UserOutlined, TeamOutlined, FileOutlined, LogoutOutlined } from '@ant-design/icons';
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export const SidebarModerator = () => {

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="bg-[var(--color-bg-hightlight)] rounded-tl-lg h-full pr-3 fixed top-0 left-0 bottom-0 overflow-y-auto w-1/4">
      <div className="text-lg text-white pt-[20px]">
        <div className="mt-8">

          <NavLink to={'/admin'}>
            <div className={`pl-[20px] pt-[18px] pb-[18px] flex flex-row rounded-r-full gap-4 duration-200 hover:opacity-85 ${location.pathname === '/admin' ? 'bg-[var(--color-primary)]' : ''} `}>
              <UserOutlined className="text-2xl" />
              <div>Manage Customer Account</div>
            </div>
          </NavLink>

          <NavLink to={'/admin/staffManage'}>
            <div className={`pl-[20px] pt-[18px] pb-[18px] flex flex-row rounded-r-full gap-4 duration-200 hover:opacity-85 ${location.pathname === '/admin/staffManage' ? 'bg-[var(--color-primary)]' : ''} `}>
              <TeamOutlined className="text-2xl" />
              <div>Manage Staff Account</div>
            </div>
          </NavLink>

          <NavLink to={'/admin/reportAccManage'}>
            <div className={`pl-[20px] pt-[18px] pb-[18px] flex flex-row rounded-r-full gap-4 duration-200 hover:opacity-85 ${location.pathname === '/admin/reportAccManage' ? 'bg-[var(--color-primary)]' : ''} `}>
              <FileOutlined className="text-2xl" />
              <div>Manage Report Account</div>
            </div>
          </NavLink>

            <button className="pl-[20px] pt-[18px] pb-[18px] flex flex-row rounded-r-full gap-4 duration-500 hover:opacity-85"
            onClick={() => {
              localStorage.removeItem("staffInfo");
              navigate('/');
            }}
            >
              <LogoutOutlined className="text-2xl" />
              <div>Logout</div>
            </button>

        </div>
      </div>
    </div>
  );
}

export default SidebarModerator;
