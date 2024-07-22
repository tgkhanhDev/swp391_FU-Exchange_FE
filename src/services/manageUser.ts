import { apiInstance } from "../constants/apiInstance";
import {
  IsAllowRegisterType,
  LoginResponse,
  LoginType,
  RegisterSellerReq,
  RegisterStudentReq,
  RegisteredStudent,
  UpdatePassword,
  viewSeller,
  UpdateBanking,
  LoginStaffType,
  Staff,
  updateDelivery
} from "../types/user";
import { deleteSellerPostProductFilter, filterGetCustomerAccount } from "../types/account";
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

const apiD = apiInstance({
  baseURL: "http://localhost:8080/staff",
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

  getAccountInfo: (payload: RegisteredStudent) =>
    apiC.get<utilsResponse<any>>(`${payload.registeredStudentId}`),

  getAccountTypeInfo: (payload: number | null) =>
    apiC.get<utilsResponse<any>>(`${payload}`),

  updatePassword: (payload: UpdatePassword) =>
    apiC.put<utilsResponse<any>>(`update-password`, payload),

  getSellerInfo: (payload: viewSeller) => {
    return apiB.get<utilsResponse<any>>(
      `information/${payload.sellerTO.RegisteredStudent.Student.studentId}`
    );
  },

  getSellerInfoBySellerId: (payload: number) =>
    apiB.get<utilsResponse<any>>(`${payload}`),

  deleteSellerPostProduct: (payload: deleteSellerPostProductFilter) =>
    apiB.put<utilsResponse<any>>(`/update/status-post-product`, payload),

  updateBanking: (payload: UpdateBanking) =>
    apiB.put<utilsResponse<any>>(`update-information`, payload),

  isLoginStaff: (payload: LoginStaffType) =>
    api.post<utilsResponse<LoginResponse>>(`/staff/login`, payload),

  getStaffInfo: (payload: number) =>
    apiD.get<utilsResponse<any>>(`detail/${payload}`),

  updateDeliveryAddress: (payload: updateDelivery) =>
    apiC.put<utilsResponse<any>>(
      `update-delivery-address`,payload),

  getAllRegisteredStudent: (payload: filterGetCustomerAccount) =>
    apiC.get<utilsResponse<any>>(
      `/filter?studentName=${payload.name}`
    ),

  getAllSeller: (payload) =>
    apiB.get<utilsResponse<any>>(`get-all`),
};
