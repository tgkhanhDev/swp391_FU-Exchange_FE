import { combineReducers } from "@reduxjs/toolkit";
import { manageProductReducer } from "./productManagement/slice";
import { managePostReducer } from "./postManagement/slice";
import { manageViewReducer } from "./viewManager/slice";
import { manageUsersReducer } from "./userManagement/slice";
import { manageOrderReducer } from "./orderManager/slice";

export const rootReducer = combineReducers({
  manageProject: manageProductReducer,
  manangePost: managePostReducer,
  manageView: manageViewReducer,
  manageUsers: manageUsersReducer,
  manageOrders: manageOrderReducer
});
