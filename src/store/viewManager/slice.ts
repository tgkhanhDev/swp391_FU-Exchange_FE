import { createSlice } from "@reduxjs/toolkit";
import { getCampusThunk, getPostTypeThunk, getCategoryThunk } from "./thunk";
import { Campus, PostType, Category } from "../../types/post";

type stateType = {
  campus: Campus[];
  postType: PostType[];
  category: Category[];
};

const initialState: stateType = {
  campus: [],
  postType: [],
  category: [],
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
      }),
      builder.addCase(getCategoryThunk.fulfilled, (state, { payload }) => {
        state.category = payload.data;
      });
  },
});

export const { reducer: manageViewReducer, actions: manageViewActions } =
  manageViewSlice;
