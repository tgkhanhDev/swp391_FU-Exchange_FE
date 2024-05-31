import { apiInstance } from "../constants/apiInstance";
import { IsAllowRegisterType, LoginResponse, LoginType } from "../types/user";

const api = apiInstance({
  baseURL: "http://localhost:8080/auth",
});

export const manageUsers = {
  isLogin: (payload: LoginType) => api.post<LoginResponse>(`/login`, payload),
  isRegistered: (payload: string) =>
    api.get<LoginResponse>(`/isRegistered/${payload}`),
  isAllowRegister: (payload: IsAllowRegisterType) =>
    api.get<LoginResponse>(
      `check-information?studentId=${payload.studentId}&identity=${payload.identity}`
    ),
};
