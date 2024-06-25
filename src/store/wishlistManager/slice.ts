import { createSlice } from "@reduxjs/toolkit";
import { viewWishlistThunk, createWishlistThunk, updateStatusWishlistThunk } from "./thunk"
import { toast } from "react-toastify";
import { viewWishlist } from "../../types/wishlist"

type stateType = {
  view: viewWishlist[] | undefined;
};

const initialState: stateType = {
  view: undefined,
};

export const manageWishlistSlice = createSlice({
  name: "manageWishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(viewWishlistThunk.fulfilled, (state, { payload }) => {
      state.view = payload.data
    })
    builder.addCase(createWishlistThunk.fulfilled, (state, { payload }) => {
      if (payload.status == 200) {
        toast.success(`Gửi yêu cầu Tặng thành công!`);
      } else if (payload.status == 400) {
        toast.warning(`${payload.content}`)
      }
       else {
        toast.error(`Bạn đã gửi yêu cầu trước đó!`);
      }
    })
    builder.addCase(updateStatusWishlistThunk.fulfilled, (state, { payload }) => {
      if (payload.status == 200) {
        toast.success(`Cập nhật thành công!`);
      } else if (payload.status == 400) {
        toast.error(`Cập nhật thất bại!`)
      }
    })
  },
});

export const { reducer: manageWishlistReducer, actions: manageWishlistActions } =
  manageWishlistSlice;
