import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProductByVariationDetailThunk, getProductByIdThunk, getProductBySellerIdThunk } from "./thunk";
import { ProductView, ProductPaymentType } from "../../types/product";

interface initialType {
  productView: ProductPaymentType[];
  productQuantity: Record<string, number>;
  product: ProductView[];
}

const initialState: initialType = {
  productView: [],
  productQuantity: {},
  product: [],
};

export const manageProductSlice = createSlice({
  name: "manageProduct",
  initialState,
  reducers: {
    setProductEmpty(state) {
      state.productView = [];
    },
    setProductQuantity(
      state,
      action: PayloadAction<{ id: number; quantity?: number }>
    ) {
      action.payload.quantity
        ? (state.productQuantity[action.payload.id] = action.payload.quantity)
        : null;
    },
    setTest(state) {
      console.log("test");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getProductByVariationDetailThunk.fulfilled,
      (state, { payload }) => {
        state.productView.push(payload.data);
        // console.log("payload.data:::", payload.data);
      }
    ),
      builder.addCase(getProductByIdThunk.fulfilled, (state, { payload }) => {
        state.productView = payload.data;
      });
      builder.addCase(getProductBySellerIdThunk.fulfilled, (state, { payload }) => {
        state.product = payload.data;
      });
  },
});

export const { setProductEmpty, setProductQuantity, setTest } =
  manageProductSlice.actions;

export const { reducer: manageProductReducer, actions: manageProductActions } =
  manageProductSlice;
