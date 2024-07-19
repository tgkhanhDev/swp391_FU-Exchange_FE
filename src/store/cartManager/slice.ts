import { createSlice } from "@reduxjs/toolkit";
import { addToCartThunk, deleteItemCartThunk, viewCartThunk } from "./thunk";
import { toast } from "react-toastify";
import { cartItem, cartItemFilter } from "../../types/cart";

interface initialType {
  cartList: cartItem[];
  cartListFilter: cartItemFilter[];
}

const initialState: initialType = {
  cartList: [],
  cartListFilter: [],
};

export const manageCartSlice = createSlice({
  name: "manageCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCartThunk.fulfilled, (state, { payload }) => {
      // state.createProductRes = payload.data;
      toast.success("Thêm sản phẩm vào giỏ hàng thành công");
    });
    builder.addCase(viewCartThunk.fulfilled, (state, { payload }) => {
      state.cartList = payload.data;

      payload.data.forEach((item) => {
        let existingItem = state.cartListFilter.find(
          (filterItem: cartItemFilter) =>
            item.sttPostInCart === filterItem.sttPostInCart
        );

        if (existingItem) {
          existingItem.variationDetail.push(item.variationDetail);
        } else {
          const sth = {
            // sttId: item.sttId,
            ...item,
            variationDetail: [item.variationDetail],
            // variation: [item.variation],
          };
          // console.log(":::",sth)
          state.cartListFilter.push(sth);
        }
      });
    });
    builder.addCase(deleteItemCartThunk.fulfilled, (state, { payload }) => {
      toast.success("Xóa sản phẩm thành công");
    });
  },
});

// export const { setProductEmpty, setProductQuantity, setTest } =
//   manageProductSlice.actions;

export const { reducer: manageCartReducer, actions: manageCartActions } =
  manageCartSlice;
