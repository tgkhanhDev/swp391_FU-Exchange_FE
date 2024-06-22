import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IsAllowRegisterType,
  LoginType,
  RegisterSellerReq,
  RegisterStudentReq,
  RegisteredStudent,
  UpdatePassword,
  viewSeller,
  UpdateBanking,
  LoginStaffType,
  Staff,
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
  async (payload: RegisteredStudent, { rejectWithValue }) => {
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

export const getSellerInfoThunk = createAsyncThunk(
  "getSellerInfo",
  async (payload: viewSeller, { rejectWithValue }) => {
    try {
      const data = await manageUsers.getSellerInfo(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateBankingThunk = createAsyncThunk(
  "updateBanking",
  async (payload: UpdateBanking, { rejectWithValue }) => {
    try {
      const data = await manageUsers.updateBanking(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getLoginStaffThunk = createAsyncThunk(
  "loginStaff",
  async (payload: LoginStaffType, { rejectWithValue }) => {
    try {
      const data = await manageUsers.isLoginStaff(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getStaffInfoThunk = createAsyncThunk(
  "getStaffInfo",
  async (payload: number, { rejectWithValue }) => {
    try {
      const data = await manageUsers.getStaffInfo(payload);
      return data.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateDeliveryAddressThunk = createAsyncThunk(
  "updateDeliveryAddress",
  async (payload: RegisteredStudent, { rejectWithValue }) => {
    try {
      const data = await manageUsers.updateDeliveryAddress(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
