import { createSlice } from "@reduxjs/toolkit";
import { getPostByIdThunk, getPostThunk } from "./thunk";
import { Post, PostLoadMore } from "../../types/post";

type stateType = {
  products: any;
  posts?: PostLoadMore;
  postDetail: Post | undefined;
};

const initialState: stateType = {
  products: [],
  posts: undefined,
  postDetail: undefined,
};

export const managePostSlice = createSlice({
  name: "manageProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPostThunk.fulfilled, (state, { payload }) => {
      state.posts = payload;
    }),
      builder.addCase(getPostByIdThunk.fulfilled, (state, { payload }) => {
        state.postDetail = payload.data;
      });
  },
});

export const { reducer: managePostReducer, actions: managePostActions } =
  managePostSlice;
