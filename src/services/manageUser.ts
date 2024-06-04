import { apiInstance } from "../constants/apiInstance";
import {
  IsAllowRegisterType,
  LoginResponse,
  LoginType,
  RegisterStudentReq,
} from "../types/user";
import { utilsResponse } from "../types/utils";

const api = apiInstance({
  baseURL: "http://localhost:8080/auth",
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
};
