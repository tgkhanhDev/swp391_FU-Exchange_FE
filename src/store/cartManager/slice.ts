import { createSlice } from "@reduxjs/toolkit";
import { addToCartThunk } from "./thunk";
import { toast } from "react-toastify";

interface initialType {
  cartList:any
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
  },
});

// export const { setProductEmpty, setProductQuantity, setTest } =
//   manageProductSlice.actions;

export const { reducer: manageCartReducer, actions: manageCartActions } =
  manageCartSlice;
