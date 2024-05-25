import { createSlice } from "@reduxjs/toolkit";
import { getCampusThunk } from "./thunk";
import { Campus } from "../../types/post";

type stateType = {
  campus: Campus[];
};

const initialState: stateType = {
  campus: [],
};

export const manageViewSlice = createSlice({
  name: "manageView",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCampusThunk.fulfilled, (state, { payload }) => {
      state.campus = payload;
    });
  },
});

export const { reducer: manageViewReducer, actions: manageViewActions } =
  manageViewSlice;
