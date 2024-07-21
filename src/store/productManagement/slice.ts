import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProductByVariationDetailThunk, getProductByIdThunk, createProductThunk, getProductByStudentIdThunk } from "./thunk";
import { ProductPaymentType, warehouseType } from "../../types/product";
import { toast } from "react-toastify";
import { cartItem } from "../../types/cart";
import { PaymentType } from "../../types/order";

interface initialType {
  productView: ProductPaymentType[];
  productQuantity: Record<string, number>;
  createProductRes: any;
  wareHouse: warehouseType[];
  payCart: PaymentType | undefined;
}

const initialState: initialType = {
  productView: [],
  productQuantity: {},
  createProductRes: undefined,
  wareHouse: [],
  payCart: undefined,
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
    setProductView(state, action: PayloadAction<ProductPaymentType[]>) {
      state.productView = action.payload;
    },
    setPayCart(state, action: PayloadAction<PaymentType>) {
      state.payCart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getProductByVariationDetailThunk.fulfilled,
      (state, { payload }) => {
        state.productView.push(payload.data);
      }
    ),
      builder.addCase(getProductByIdThunk.fulfilled, (state, { payload }) => {
        state.productView = payload.data;
      });
    builder.addCase(createProductThunk.fulfilled, (state, { payload }) => {
      // state.createProductRes = payload.data;
      // toast.success(payload.data.content);
    });
    builder.addCase(
      getProductByStudentIdThunk.fulfilled,
      (state, { payload }) => {
        state.wareHouse = payload.data;
      }
    );
  },
});

export const { setProductEmpty, setProductQuantity, setProductView, setPayCart } =
  manageProductSlice.actions;

export const { reducer: manageProductReducer, actions: manageProductActions } =
  manageProductSlice;
