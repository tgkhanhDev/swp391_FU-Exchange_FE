import { createSlice } from "@reduxjs/toolkit";
import { Post, PostLoadMore } from "../../types/post";
import { toast } from "react-toastify";
import { Orders, PostProductInOrder } from "../../types/order";
import { getAllPostByModeratorThunk, updateStatusPostProductThunk } from "./thunk";

type stateType = {
  
};

const initialState: stateType = {

};

export const manageManagerSlice = createSlice({
  name: "manageManager",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      updateStatusPostProductThunk.fulfilled,
      (state, { payload }) => {
        toast.success(payload.content);
      }
    ),
    builder.addCase(
      updateStatusPostProductThunk.rejected,
      (state, { payload }) => {
        toast.error("Update Failed!");
      }
    );
  }

})

export const { reducer: manageManagerReducer, actions: manageManagerActions } =
  manageManagerSlice;
