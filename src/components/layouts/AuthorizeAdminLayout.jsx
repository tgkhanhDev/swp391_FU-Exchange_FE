import React from "react";
import { Outlet } from "react-router-dom";
import { HeaderStaff } from "./HeaderStaff";
import SidebarAdmin from "./SidebarAdmin";

export const AuthorizeAdminLayout = () => {
  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-3 h-full">
        <SidebarAdmin />
      </div>
      <div className="col-span-9 flex flex-col">
        <HeaderStaff />
        <div className="flex-grow p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthorizeAdminLayout;
