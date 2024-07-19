import { createSlice } from "@reduxjs/toolkit";
import { viewChatRoom, chatRoomStS, sendMessage, contactSeller, contactStudent, deleteChatRoom } from "./thunk";
import { ChatRoom } from "../../types/chat"
import { toast } from "react-toastify";

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
    builder.addCase(sendMessage.fulfilled, (state, { payload }) => { })
    builder.addCase(contactSeller.fulfilled, (state, { payload }) => { })

    builder.addCase(contactStudent.fulfilled, (state, { payload }) => {
      if (payload.status == 200) {
        toast.success(`${payload.content}`);
      } else if (payload.status == 400) {
        toast.error(`${payload.content}`)
      }
    })

    builder.addCase(deleteChatRoom.fulfilled, (state, { payload }) => {
      if (payload.status == 200) {
        toast.success(`${payload.content}`);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else if (payload.status == 400) {
        toast.error(`${payload.content}`)
      }
    })
  },
});

export const { reducer: manageChatReducer, actions: manageChatActions } =
  manageChatSlice;
