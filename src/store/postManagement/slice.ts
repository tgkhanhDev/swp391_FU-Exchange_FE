import { createSlice } from "@reduxjs/toolkit";
import { getPostThunk } from "./thunk";
import { PostLoadMore } from "../../types/post";

type stateType = {
  products: any;
  posts?: PostLoadMore;
};

const initialState: stateType = {
  products: [],
  posts: undefined,
};

export const managePostSlice = createSlice({
  name: "manageProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPostThunk.fulfilled, (state, { payload }) => {
      state.posts = payload;
    });
  },
});

export const { reducer: managePostReducer, actions: managePostActions } =
  managePostSlice;
