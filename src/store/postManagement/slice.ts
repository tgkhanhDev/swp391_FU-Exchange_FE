import { createSlice } from "@reduxjs/toolkit";
import {
  createPostThunk,
  getPostByIdThunk,
  getPostBySellerIdThunk,
  getPostThunk,
} from "./thunk";
import { Post, PostLoadMore } from "../../types/post";
import { toast } from "react-toastify";

type stateType = {
  products: any;
  posts?: PostLoadMore;
  postDetail: Post | undefined;
  postView: Post | undefined;
};

const initialState: stateType = {
  products: [],
  posts: undefined,
  postDetail: undefined,
  postView: undefined,
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
      }),
      builder.addCase(createPostThunk.fulfilled, (state, { payload }) => {
        toast.success(payload.content);
      });
    builder.addCase(getPostBySellerIdThunk.fulfilled, (state, { payload }) => {
      state.postView = payload.data;
    });
  },
});

export const { reducer: managePostReducer, actions: managePostActions } =
  managePostSlice;
