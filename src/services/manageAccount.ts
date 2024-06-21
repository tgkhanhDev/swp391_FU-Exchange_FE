import { apiInstance } from "../constants/apiInstance";
import { utilsResponse } from "../types/utils";
import { filterGetStaffAccount, setStatus, UpdateProfile } from "../types/account"

const api = apiInstance({
  baseURL: "http://localhost:8080/staff",
});

export const manageAccount = {
  getAllStaff: (payload: filterGetStaffAccount) => 
    api.get<utilsResponse<any>>(`${payload.current}?identityCard=${payload.identityCard}`),

  setStatusStaff: (payload: setStatus) => 
    api.put<utilsResponse<any>>(`${payload.staffId}/update-status?active=${payload.active}`),

  updateProfile: (payload: UpdateProfile) =>
    api.put<utilsResponse<any>>(`{staffId}/update-staff`, payload),
};