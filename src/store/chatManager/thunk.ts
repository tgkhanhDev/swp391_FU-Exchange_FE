import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageChat } from "../../services/manageChat";

export const viewChatRoom = createAsyncThunk(
  "chatRoom",
  async (payload: number, { rejectWithValue }) => {
    try {
      const data = await manageChat.chatRoom(payload);
      console.log(data.data.data)
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);