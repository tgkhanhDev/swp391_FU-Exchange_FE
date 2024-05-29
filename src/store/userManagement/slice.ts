import { createSlice } from "@reduxjs/toolkit";
import { Post, PostLoadMore } from "../../types/post";
import { getLoginThunk, isRegisteredThunk } from "./thunk";
import { LoginResponse } from "../../types/user";

type stateType = {
  users: any;
  isAccountRegistered: boolean;
  loginRes: LoginResponse | undefined | unknown;
};

const initialState: stateType = {
  users: [],
  isAccountRegistered: false,
  loginRes: undefined,
};

export const manageUsersSlice = createSlice({
  name: "manageProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLoginThunk.fulfilled, (state, { payload }) => {
      // state.posts = payload;
      console.log("trueeee");
    }),
      builder.addCase(getLoginThunk.rejected, (state, { payload }) => {
        //   state.posts = payload;
        console.log("Falseee");
      }),
      builder.addCase(isRegisteredThunk.fulfilled, (state, { payload }) => {
        console.log("payload.statusCode::: ", payload.statusCode);
        
        if (payload.statusCode == 202) {
          console.log("Success::: ", payload.content);
          state.isAccountRegistered = true;
        } else {
          console.log("Failed::: ", payload.content);
          state.isAccountRegistered = false;
        }
        state.loginRes = payload;

      });
  },
});

export const { reducer: manageUsersReducer, actions: manageUsersActions } =
  manageUsersSlice;
