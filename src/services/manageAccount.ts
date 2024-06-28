import { apiInstance } from "../constants/apiInstance";
import { utilsResponse } from "../types/utils";
import { filterGetStaffAccount, setStatus, UpdateProfile, UpdatePassword, Seller, setStatusAcc, setStatusSeller } from "../types/account"

const api = apiInstance({
  baseURL: "http://localhost:8080/staff",
});

const apiB = apiInstance({
  baseURL: "http://localhost:8080/moderator",
});

const apiC = apiInstance({
  baseURL: "http://localhost:8080/student",
});

const apiD = apiInstance({
  baseURL: "http://localhost:8080/seller",
});

export const manageAccount = {
  getAllStaff: (payload: filterGetStaffAccount) => 
    api.get<utilsResponse<any>>(`${payload.current}?identityCard=${payload.identityCard}`),

  setStatusStaff: (payload: setStatus) => 
    api.put<utilsResponse<any>>(`${payload.staffId}/update-status?active=${payload.active}`),

  updateProfile: (payload: UpdateProfile) =>
    api.put<utilsResponse<any>>(`{staffId}/update-staff`, payload),

  updateStaffPassword: (payload: UpdatePassword) =>
    api.put<utilsResponse<any>>(`update-password`, payload),

  getAllRequestSellerAcc: () =>
    apiB.get<utilsResponse<any>>(`view-register-to-seller-request`),

  setStatusAcc: (payload: setStatusAcc) => 
    apiC.put<utilsResponse<any>>(`update-status`, payload),

  setStatusSeller: (payload: setStatusSeller) => 
    apiD.put<utilsResponse<any>>(`update-status`, payload),
};