import { apiInstance } from "../constants/apiInstance";
import {
  IsAllowRegisterType,
  LoginResponse,
  LoginType,
  RegisterSellerReq,
  RegisterStudentReq,
  Student,
  UpdatePassword,
} from "../types/user";
import { utilsResponse } from "../types/utils";

const api = apiInstance({
  baseURL: "http://localhost:8080/auth",
});

const apiB = apiInstance({
  baseURL: "http://localhost:8080/seller",
});

const apiC = apiInstance({
  baseURL: "http://localhost:8080/student",
});

export const manageUsers = {
  isLogin: (payload: LoginType) =>
    api.post<utilsResponse<LoginResponse>>(`/login`, payload),
  isRegistered: (payload: string) =>
    api.get<utilsResponse<any>>(`/isRegistered/${payload}`),
  isAllowRegister: (payload: IsAllowRegisterType) =>
    api.get<utilsResponse<any>>(
      `check-information?studentId=${payload.studentId}&identity=${payload.identity}`
    ),
  registerClient: (payload: RegisterStudentReq) =>
    api.post<utilsResponse<any>>(`register`, payload),

  registerSeller: (payload: RegisterSellerReq) =>
    apiB.post<utilsResponse<any>>(`register-to-seller`, payload),

  getAccountInfo: (payload: Student) =>
    apiC.get<utilsResponse<any>>(`view-student?studentId=${payload.studentId}`),

  updatePassword: (payload: UpdatePassword) =>
    apiC.put<utilsResponse<any>>(`update-password`, payload),
};
