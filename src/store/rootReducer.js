import { combineReducers } from "@reduxjs/toolkit";
import { manageProductReducer } from "./productManagement/slice";
import { managePostReducer } from "./postManagement/slice";

export const rootReducer = combineReducers({
  manageProject: manageProductReducer,
  manangePost: managePostReducer,
});
