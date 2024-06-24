import { createSlice } from "@reduxjs/toolkit";
import { viewChatRoom, chatRoomStS, sendMessage, contactSeller } from "./thunk";
import { ChatRoom } from "../../types/chat"
 
type stateType = {
  chatroom: ChatRoom[];
  chatDetail: ChatRoom[];
};

const initialState: stateType = {
  chatroom: [],
  chatDetail: [],
};

export const manageChatSlice = createSlice({
  name: "manageChat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(viewChatRoom.fulfilled, (state, { payload }) => {
      state.chatroom = payload.data
    })
    builder.addCase(chatRoomStS.fulfilled, (state, { payload }) => {
      state.chatDetail = payload.data
    })
    builder.addCase(sendMessage.fulfilled, (state, { payload }) => {})
    builder.addCase(contactSeller.fulfilled, (state, { payload }) => {})
  },
});

export const { reducer: manageChatReducer, actions: manageChatActions } =
  manageChatSlice;
