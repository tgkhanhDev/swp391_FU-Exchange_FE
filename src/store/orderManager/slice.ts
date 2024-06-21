import { createSlice } from "@reduxjs/toolkit";
import { Post, PostLoadMore } from "../../types/post";
import { postPayCodThunk, postPayVnPayThunk } from "./thunk";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type stateType = {};

const initialState: stateType = {};

export const manageOrderSlice = createSlice({
  name: "manageProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postPayCodThunk.fulfilled, (state, { payload }) => {
      // console.log("payloadCOD:::", payload);
      toast.success(payload.content);
    });
    builder.addCase(postPayVnPayThunk.fulfilled, (state, { payload }) => {
      // toast.success(payload.content);
      console.log("payload: ", payload.paymentUrl)
      // window.location.href(payload.paymentUrl)
    });
  },
});

export const { reducer: manageOrderReducer, actions: manageOrderActions } =
  manageOrderSlice;
