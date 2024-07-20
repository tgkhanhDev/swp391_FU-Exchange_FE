import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageChat } from "../../services/manageChat";
import { StudentToStudentChat, SendMessage, ContactSeller, ContactStudent } from "../../types/chat"

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
  async (payload: StudentToStudentChat, { rejectWithValue }) => {
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

export const contactStudent = createAsyncThunk(
  "contactStudent",
  async (payload: ContactStudent, { rejectWithValue }) => {
    try {
      const data = await manageChat.contactStudent(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteChatRoom = createAsyncThunk(
  "deleteChatRoom",
  async (payload: number, { rejectWithValue }) => {
    try {
      const data = await manageChat.deleteChatRoom(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);