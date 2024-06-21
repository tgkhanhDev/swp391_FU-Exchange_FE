import React from "react";
import { Outlet } from "react-router-dom";
import { HeaderStaff } from "./HeaderStaff";
import SidebarModerator from "./SidebarModerator";

export const AuthorizeModeratorLayout = () => {
  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-3 h-full">
        <SidebarModerator />
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

export default AuthorizeModeratorLayout;