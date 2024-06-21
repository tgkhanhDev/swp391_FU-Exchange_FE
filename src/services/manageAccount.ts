import { apiInstance } from "../constants/apiInstance";
import { utilsResponse } from "../types/utils";
import { filterGetStaffAccount } from "../types/account"

const api = apiInstance({
  baseURL: "http://localhost:8080/staff",
});

export const manageAccount = {
  getAllStaff: (payload: filterGetStaffAccount) => 
    api.get<utilsResponse<any>>(`${payload.current}?identityCard=${payload.identityCard}`),
};