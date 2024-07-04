import { createSlice } from "@reduxjs/toolkit";
import { getPostTypeReportThunk, sendReportThunk, getSellerTypeReportThunk, sendReportSellerThunk, viewFilterReportSellerThunk, updateStatusReportSellerThunk, viewFilterReportPostThunk, updateStatusReportPostThunk } from "./thunk";
import { ReportPostType, ReportSellerType, ReportSeller, ReportPost } from "../../types/report"
import { toast } from "react-toastify";

type stateType = {
  reportPostType: ReportPostType[];
  reportSellerType: ReportSellerType[];
  viewReportSeller: ReportSeller[];
  viewReportPost: ReportPost[];
};

const initialState: stateType = {
  reportPostType: [],
  reportSellerType: [],
  viewReportSeller: [],
  viewReportPost: [],
};

export const manageReportSlice = createSlice({
  name: "manageReport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(getPostTypeReportThunk.fulfilled, (state, { payload }) => {
        state.reportPostType = payload.data;
      })
      builder.addCase(sendReportThunk.fulfilled, (state, { payload }) => {
        if (payload.status == 200) {
          toast.success(`${payload.content}`);
        } else {
          toast.error(`${payload.content}`);
        }
      })
      builder.addCase(getSellerTypeReportThunk.fulfilled, (state, { payload }) => {
        state.reportSellerType = payload.data;
      })
      builder.addCase(sendReportSellerThunk.fulfilled, (state, { payload }) => {
        if (payload.status == 200) {
          toast.success(`${payload.content}`);
        } else {
          toast.error(`${payload.content}`);
        }
      })
      builder.addCase(viewFilterReportSellerThunk.fulfilled, (state, { payload }) => {
        state.viewReportSeller = payload.data;
      })
      builder.addCase(updateStatusReportSellerThunk.fulfilled, (state, { payload }) => {
        if (payload.status == 200) {
          toast.success(`${payload.content}`);
        } else {
          toast.error(`${payload.content}`);
        }
      })
      builder.addCase(viewFilterReportPostThunk.fulfilled, (state, { payload }) => {
        state.viewReportPost = payload.data;
      })
      builder.addCase(updateStatusReportPostThunk.fulfilled, (state, { payload }) => {
        if (payload.status == 200) {
          toast.success(`${payload.content}`);
        } else {
          toast.error(`${payload.content}`);
        }
      })
  },
});

export const { reducer: manageReportReducer, actions: manageReportActions } =
manageReportSlice;
