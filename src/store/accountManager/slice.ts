import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllStaffAccountThunk, setStatusStaffThunk, updateProfileThunk } from "./thunk";
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

    builder.addCase(setStatusStaffThunk.fulfilled, (state, { payload }) => { });

    builder.addCase(updateProfileThunk.fulfilled, (state, { payload }) => {
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
  },
});

export const { reducer: manageAccountReducer, actions: manageAccountActions } = manageAccountSlice;
