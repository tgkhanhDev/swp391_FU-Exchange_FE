import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post, PostLoadMore } from "../../types/post";
import {
  getLoginThunk,
  isAllowRegisteredThunk,
  isRegisteredThunk,
  registerClientThunk,
  registerSellerThunk,
  getAccountInfoThunk,
  updatePasswordThunk,
  getSellerInfoThunk,
  updateBankingThunk,
  getLoginStaffThunk,
  getStaffInfoThunk,
  updateDeliveryAddressThunk,
  getAllRegisteredStudentThunk,
  getAccountInfoTypeThunk,
  getSellerInfoBySellerIdThunk,
  deleteSellerPostProductThunk,
} from "./thunk";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

type stateType = {
  users: any;
  isAccountRegistered: boolean;
  // loginRes: LoginResponse | undefined | unknown;
  isAllowRegister: boolean;
  isAuthorize: boolean;
};

const initialState: stateType = {
  users: [],
  isAccountRegistered: false,
  // loginRes: undefined,
  isAuthorize: false,
  isAllowRegister: false,
};

export const manageUsersSlice = createSlice({
  name: "manageProduct",
  initialState,
  reducers: {
    setUsers(state, { payload }) {
      state.users = payload;
    },
    setIsAccountRegistered(state, { payload }) {
      state.isAccountRegistered = payload;
    },
    setIsAuthorize(state, { payload }) {
      state.isAuthorize = payload;
    },
    setIsAllowRegister(state, { payload }) {
      state.isAllowRegister = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLoginThunk.fulfilled, (state, { payload }) => {
      if (payload.status == 200) {
        toast.success(`${payload.content}`);
        //!redirect here
        state.isAuthorize = true;
        window.location.href = "/";

        localStorage.setItem("userInfo", JSON.stringify(payload.data));
      } else {
        toast.error(`${payload.content}`);
      }
    }),
      builder.addCase(getLoginThunk.rejected, (state, { payload }) => {}),
      builder.addCase(getLoginStaffThunk.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          toast.success(`${payload.content}`);

          // Lưu thông tin staff vào localStorage
          localStorage.setItem("staffInfo", JSON.stringify(payload.data));

          // Lấy role từ payload.data
          const role = payload.data.role;

          // Kiểm tra role và chuyển hướng dựa trên giá trị của nó
          if (role === "Administrator") {
            window.location.href = "/admin";
          } else if (role === "Moderator") {
            window.location.href = "/moderator";
          }

          state.isAuthorize = true;
        } else {
          toast.error(`${payload.content}`);
        }
      });
    builder.addCase(getLoginStaffThunk.rejected, (state, { payload }) => {}),
      builder.addCase(isRegisteredThunk.fulfilled, (state, { payload }) => {
        if (payload.status == 200) {
          state.isAccountRegistered = true;
        } else {
          toast.error(`${payload.content}`);
          state.isAccountRegistered = false;
        }
      }),
      builder.addCase(isRegisteredThunk.rejected, (state, { payload }) => {
        //! :>
        toast.error(`Tài khoản chưa tồn tại`);
        state.isAccountRegistered = false;
      }),
      builder.addCase(
        isAllowRegisteredThunk.fulfilled,
        (state, { payload }) => {
          if (payload.status == 200) {
            toast.success(`${payload.content}`);
            state.isAllowRegister = true;
          } else {
            toast.error(`${payload.content}`);
            state.isAllowRegister = false;
          }
        }
      ),
      builder.addCase(registerClientThunk.fulfilled, (state, { payload }) => {
        if (payload.status == 200) {
          toast.success(`${payload.content}`);

          state.isAllowRegister = true;
          window.location.href = "/login";
        } else {
          toast.error(`${payload.content}`);
          state.isAllowRegister = false;
        }
      });
    builder.addCase(registerSellerThunk.fulfilled, (state, { payload }) => {
      if (payload.status == 200) {
        toast.success(`${payload.content}`);
      } else {
        toast.info(`${payload.content}`);
      }
    });
    builder.addCase(getAccountInfoThunk.fulfilled, (state, { payload }) => {
      state.users = payload.data;
    });
    builder.addCase(getAccountInfoTypeThunk.fulfilled, (state, { payload }) => {
      state.users = payload.data;
    });
    builder.addCase(getSellerInfoThunk.fulfilled, (state, { payload }) => {
      state.users = payload.data;
    });

    builder.addCase(getStaffInfoThunk.fulfilled, (state, { payload }) => {
      state.users = payload.data;
    });
    builder.addCase(
      getSellerInfoBySellerIdThunk.fulfilled,
      (state, { payload }) => {
        state.users = payload.data;
      }
    );
    builder.addCase(updatePasswordThunk.fulfilled, (state, { payload }) => {
      if (payload.status == 200) {
        setTimeout(() => {
          window.location.reload();
        }, 500);
        toast.success(`${payload.content}`);
      } else {
        toast.error(`${payload.content}`);
      }
    });
    builder.addCase(updateBankingThunk.fulfilled, (state, { payload }) => {
      if (payload.status == 200) {
        setTimeout(() => {
          window.location.reload();
        }, 500);
        toast.success(`${payload.content}`);
      } else {
        toast.error(`${payload.content}`);
      }
    });
    builder.addCase(
      updateDeliveryAddressThunk.fulfilled,
      (state, { payload }) => {
        if (payload.status == 200) {
          setTimeout(() => {
            window.location.reload();
          }, 500); // Hiển thị thông báo sau 1 giây
          toast.success(`${payload.content}`);
        } else {
          toast.error(`${payload.content}`);
        }
      }
    );
    builder.addCase(
      getAllRegisteredStudentThunk.fulfilled,
      (state, { payload }) => {
        state.users = payload.data;
      }
    );
  },
});

export const {
  setUsers,
  setIsAccountRegistered,
  setIsAuthorize,
  setIsAllowRegister,
} = manageUsersSlice.actions;

export const { reducer: manageUsersReducer, actions: manageUsersActions } =
  manageUsersSlice;
