import { createAsyncThunk } from "@reduxjs/toolkit";
import { IsAllowRegisterType, LoginType } from "../../types/user";
import { manageUsers } from "../../services/manageUser";

export const getLoginThunk = createAsyncThunk(
  "login",
  async (payload: LoginType, { rejectWithValue }) => {
    try {
      const data = await manageUsers.isLogin(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const isRegisteredThunk = createAsyncThunk(
  "isRegistered",
  async (payload: string, { rejectWithValue }) => {
    try {
      const data = await manageUsers.isRegistered(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const isAllowRegisteredThunk = createAsyncThunk(
  "isAllowRegistered",
  async (payload: IsAllowRegisterType, { rejectWithValue }) => {
    try {
      const data = await manageUsers.isAllowRegister(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
