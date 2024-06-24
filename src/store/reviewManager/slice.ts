import { createSlice } from "@reduxjs/toolkit";
import { createReviewThunk } from "./thunk"
import { toast } from "react-toastify";

type stateType = {

};

const initialState: stateType = {

};

export const manageReviewSlice = createSlice({
  name: "manageReview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createReviewThunk.fulfilled, (state, { payload }) => {
      if (payload.status == 200) {
        toast.success('Đánh giá thành công!');
        setTimeout(() => {
          window.location.href = "/authorize/order";
        }, 1000);
      } else {
        toast.error('Đánh giá thất bại!');
      }
    })
  },
});

export const { reducer: manageReviewReducer, actions: manageReviewActions } =
manageReviewSlice;
