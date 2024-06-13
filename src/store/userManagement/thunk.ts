import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IsAllowRegisterType,
  LoginType,
  RegisterSellerReq,
  RegisterStudentReq,
  Student,
  UpdatePassword,
} from "../../types/user";
import { managePost } from "../../services/managePost";
import { PostFilter_API } from "../../types/post";
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

export const registerClientThunk = createAsyncThunk(
  "registerClient",
  async (payload: RegisterStudentReq, { rejectWithValue }) => {
    try {
      const data = await manageUsers.registerClient(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerSellerThunk = createAsyncThunk(
  "registerSeller",
  async (payload: RegisterSellerReq, { rejectWithValue }) => {
    try {
      const data = await manageUsers.registerSeller(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAccountInfoThunk = createAsyncThunk(
  "getAccountInfo",
  async (payload: Student, { rejectWithValue }) => {
    try {
      const data = await manageUsers.getAccountInfo(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updatePasswordThunk = createAsyncThunk(
  "updatePassword",
  async (payload: UpdatePassword, { rejectWithValue }) => {
    try {
      const data = await manageUsers.updatePassword(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
