import { createSlice } from "@reduxjs/toolkit";
import { addToCartThunk, deleteItemCartThunk, updateItemCartThunk, viewCartThunk } from "./thunk";
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
      const cartList = payload.data;
      const cartListFilter: cartItemFilter[] = [];

      cartList.forEach((item: cartItem) => {
        let existingItem: any = cartListFilter.find(
          (filterItem: cartItemFilter) => item.sttPostInCart === filterItem.sttPostInCart
        );

        if (existingItem) {
          existingItem.variationDetail.push(item.variationDetail);
        } else {
          const newItem = {
            ...item,
            variationDetail: [item.variationDetail],
          };
          cartListFilter.push(newItem);
        }
      });

      return {
        ...state,
        cartList,
        cartListFilter,
      };

    }),
    builder.addCase(deleteItemCartThunk.fulfilled, (state, { payload }) => {
      toast.success("Xóa sản phẩm thành công");
    });
    builder.addCase(updateItemCartThunk.rejected, (state, { payload }) => {
      toast.error("Cập nhập sản phẩm thất bại!");
    });
  },
});

// export const { setProductEmpty, setProductQuantity, setTest } =
//   manageProductSlice.actions;

export const { reducer: manageCartReducer, actions: manageCartActions } =
  manageCartSlice;
