import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProductByVariationDetailThunk, getProductByIdThunk } from "./thunk";

interface initialType {
  productView: any;
  productQuantity: { [prdId: number]: number };
}

const initialState = {
  productView: [],
  productQuantity: {},
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
      state.productQuantity
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getProductByVariationDetailThunk.fulfilled,
      (state, { payload }) => {
        state.productView = payload.data;
      }
    ),
      builder.addCase(getProductByIdThunk.fulfilled, (state, { payload }) => {
        state.productView = payload.data;
      });
  },
});

export const { reducer: manageProductReducer, actions: manageProductActions } =
  manageProductSlice;
