import { createSlice } from "@reduxjs/toolkit";
import { getCampusThunk, getPostTypeThunk } from "./thunk";
import { Campus, PostType } from "../../types/post";

type stateType = {
  campus: Campus[];
  postType: PostType[];
};

const initialState: stateType = {
  campus: [],
  postType:[],
};

export const manageViewSlice = createSlice({
  name: "manageView",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCampusThunk.fulfilled, (state, { payload }) => {
      state.campus = payload.data;
    }),
    builder.addCase(getPostTypeThunk.fulfilled, (state, { payload }) => {
      state.postType = payload.data;
    })
  },
});

export const { reducer: manageViewReducer, actions: manageViewActions } =
  manageViewSlice;
