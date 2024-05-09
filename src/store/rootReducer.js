import { combineReducers } from "@reduxjs/toolkit";
import { manageUserReducer } from "./projectManagement/slice";
export const rootReducer = combineReducers({
    manageProject: manageUserReducer
});
