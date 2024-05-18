import { combineReducers } from "@reduxjs/toolkit";
import { manageProductReducer } from "./productManagement/slice";

export const rootReducer = combineReducers({
  manageProject: manageProductReducer,
});
