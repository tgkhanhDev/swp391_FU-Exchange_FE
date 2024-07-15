import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllStaffAccountThunk, setStatusStaffThunk, updateAProfileThunk, updateMProfileThunk, updatePasswordStaffThunk, setStatusAccountThunk, setStatusSellerThunk } from "./thunk";
import { Account } from "../../types/account"
import { toast } from "react-toastify";


type stateType = {
  account: Account[];
};

const initialState: stateType = {
  account: [],
};

export const manageAccountSlice = createSlice({
  name: "manageAccount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Ensure no duplicate addCase for the same action type
    builder.addCase(getAllStaffAccountThunk.fulfilled, (state, { payload }) => {
      state.account = payload.data;
    });

    builder.addCase(setStatusStaffThunk.fulfilled, (state, { payload }) => {
      if (payload.status == 200) {
        toast.success(`${payload.content}`);
      } else {
        toast.error(`${payload.content}`);
      }
    });

    builder.addCase(updateAProfileThunk.fulfilled, (state, { payload }) => {
      if (payload.status == 200) {
        toast.success(`Cập nhật thông tin tài khoản thành công!`);
        setTimeout(() => {
          window.location.href = "/admin/profile";
        }, 2000);
      } else {
        toast.error(`${payload.content}`);
      }
    }
    );

    builder.addCase(updateMProfileThunk.fulfilled, (state, { payload }) => {
      if (payload.status == 200) {
        toast.success(`Cập nhật thông tin tài khoản thành công!`);
        setTimeout(() => {
          window.location.href = "/moderator/profile";
        }, 2000);
      } else {
        toast.error(`${payload.content}`);
      }
    }
    );

    builder.addCase(updatePasswordStaffThunk.fulfilled, (state, { payload }) => {
      if (payload.status == 200) {
        toast.success(`${payload.content}`);
      } else {
        toast.error(`${payload.content}`);
      }
    }
    );

    builder.addCase(setStatusAccountThunk.fulfilled, (state, { payload }) => {
      if (payload.status == 200) {
        toast.success(`${payload.content}`);
      } else {
        toast.error(`${payload.content}`);
      }
    });
    builder.addCase(setStatusSellerThunk.fulfilled, (state, { payload }) => {
      if (payload.status == 200) {
        toast.success(`${payload.content}`);
      } else {
        toast.error(`${payload.content}`);
      }
    });
  },
});

export const { reducer: manageAccountReducer, actions: manageAccountActions } = manageAccountSlice;
