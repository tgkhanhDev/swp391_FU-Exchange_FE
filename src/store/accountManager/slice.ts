import { createSlice } from "@reduxjs/toolkit";
import { getAllStaffAccountThunk } from "./thunk";
import { Account } from "../../types/account"

type stateType = {
  account: Account[];
};

const initialState: stateType = {
  account: [],
};

export const manageAccountSlice = createSlice({
  name: "manageAccount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllStaffAccountThunk.fulfilled, (state, { payload }) => {
      state.account = payload.data
    })
  },
});

export const { reducer: manageAccountReducer, actions: manageAccountActions } =
manageAccountSlice;