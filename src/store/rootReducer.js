import { combineReducers } from "@reduxjs/toolkit";
import { manageProductReducer } from "./productManagement/slice";
import { managePostReducer } from "./postManagement/slice";
import { manageViewReducer } from "./viewManager/slice";
import { manageUsersReducer } from "./userManagement/slice";
import { manageOrderReducer } from "./orderManager/slice";
import { manageCartReducer } from "./cartManager/slice";
import { manageChatReducer } from "./chatManager/slice";
import { manageAccountReducer } from "./accountManager/slice"
import { manageReviewReducer } from "./reviewManager/slice"

export const rootReducer = combineReducers({
  manageProduct: manageProductReducer,
  manangePost: managePostReducer,
  manageView: manageViewReducer,
  manageUsers: manageUsersReducer,
  manageOrders: manageOrderReducer,
  manageCart: manageCartReducer,
  manageChat: manageChatReducer,
  manageAccount: manageAccountReducer,
  manageReview: manageReviewReducer,
});
