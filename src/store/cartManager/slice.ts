import { createSlice } from "@reduxjs/toolkit";
import { addToCartThunk, viewCartThunk } from "./thunk";
import { toast } from "react-toastify";
import { cartItem } from "../../types/cart";

interface initialType {
  cartList: cartItem[];
}

const initialState: initialType = {
  cartList: [],
}

export const manageCartSlice = createSlice({
  name: "manageCart",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(addToCartThunk.fulfilled, (state, { payload }) => {
      // state.createProductRes = payload.data;
      toast.success(payload.data.content);
    });
    builder.addCase(viewCartThunk.fulfilled, (state, {payload} ) => {
      console.log("SDADAD: ", payload);
      
      state.cartList = payload.data;
    })
  },
});

// export const { setProductEmpty, setProductQuantity, setTest } =
//   manageProductSlice.actions;

export const { reducer: manageCartReducer, actions: manageCartActions } =
  manageCartSlice;
