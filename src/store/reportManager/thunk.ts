import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageReport } from "../../services/manageReport";
import { SendReport, SendReportSeller, FilterSellerReport, UpdateStatusReportSeller, FilterPostReport, UpdateStatusReportPost } from "../../types/report"

export const getPostTypeReportThunk = createAsyncThunk(
  "reportPostType",
  async (_, { rejectWithValue }) => {
    try {
      const data = await manageReport.getAllReportPostType();
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const sendReportThunk = createAsyncThunk(
  "sendReport",
  async (payload: SendReport, { rejectWithValue }) => {
    try {
      const data = await manageReport.sendReportPost(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getSellerTypeReportThunk = createAsyncThunk(
  "reportSellerType",
  async (_, { rejectWithValue }) => {
    try {
      const data = await manageReport.getAllReportSellerType();
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const sendReportSellerThunk = createAsyncThunk(
  "sendReportSeller",
  async (payload: SendReportSeller, { rejectWithValue }) => {
    try {
      const data = await manageReport.sendReportSeller(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const viewFilterReportSellerThunk = createAsyncThunk(
  "viewFilterReportSeller",
  async (payload: FilterSellerReport, { rejectWithValue }) => {
    try {
      const data = await manageReport.viewFilterReportSeller(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateStatusReportSellerThunk = createAsyncThunk(
  "updateStatusReportSeller",
  async (payload: UpdateStatusReportSeller, { rejectWithValue }) => {
    try {
      const data = await manageReport.updateStatusReportSeller(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const viewFilterReportPostThunk = createAsyncThunk(
  "viewFilterReportPost",
  async (payload: FilterPostReport, { rejectWithValue }) => {
    try {
      const data = await manageReport.viewFilterReportPost(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateStatusReportPostThunk = createAsyncThunk(
  "updateStatusReportPost",
  async (payload: UpdateStatusReportPost, { rejectWithValue }) => {
    try {
      const data = await manageReport.updateStatusReportPost(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);