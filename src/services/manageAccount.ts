import { apiInstance } from "../constants/apiInstance";
import { utilsResponse } from "../types/utils";
import { filterGetStaffAccount, setStatus, UpdateProfile, UpdatePassword, Seller, setStatusAcc } from "../types/account"

const api = apiInstance({
  baseURL: "http://localhost:8080/staff",
});

const apiB = apiInstance({
  baseURL: "http://localhost:8080/moderator",
});

const apiC = apiInstance({
  baseURL: "http://localhost:8080/student",
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

  getAllRequestSellerAcc: (payload: Seller) =>
    apiB.put<utilsResponse<any>>(`view-register-to-seller-request`),

  setStatusAcc: (payload: setStatusAcc) => 
    apiC.put<utilsResponse<any>>(`${payload.registeredStudentId}/update-active?active=${payload.active}`),
};