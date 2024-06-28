import { createSlice } from "@reduxjs/toolkit";
import { createReviewThunk, viewAllReviewThunk } from "./thunk"
import { toast } from "react-toastify";
import { viewReview } from "../../types/review"

type stateType = {
  review: viewReview[];
};

const initialState: stateType = {
  review: [],
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
    builder.addCase(viewAllReviewThunk.fulfilled, (state, { payload }) => {
      state.review = payload.data;
    })
  },
});

export const { reducer: manageReviewReducer, actions: manageReviewActions } =
manageReviewSlice;
