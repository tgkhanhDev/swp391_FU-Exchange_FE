import { createSlice } from "@reduxjs/toolkit";
import { viewChatRoom } from "./thunk";

type stateType = {

};

const initialState: stateType = {

};

export const manageChatSlice = createSlice({
  name: "manageChat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(viewChatRoom.fulfilled, (state, { payload }) => {})
  },
});

export const { reducer: manageChatReducer, actions: manageChatActions } =
  manageChatSlice;
