import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageChat } from "../../services/manageChat";
import { StudentToSellerChat, SendMessage, ContactSeller } from "../../types/chat"

export const viewChatRoom = createAsyncThunk(
  "chatRoom",
  async (payload: number, { rejectWithValue }) => {
    try {
      const data = await manageChat.chatRoom(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const chatRoomStS = createAsyncThunk(
  "chatRoomStS",
  async (payload: StudentToSellerChat, { rejectWithValue }) => {
    try {
      const data = await manageChat.chatRoomStS(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "sendMessage",
  async (payload: SendMessage, { rejectWithValue }) => {
    try {
      const data = await manageChat.sendMessage(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const contactSeller = createAsyncThunk(
  "contactSeller",
  async (payload: ContactSeller, { rejectWithValue }) => {
    try {
      const data = await manageChat.contactSeller(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);