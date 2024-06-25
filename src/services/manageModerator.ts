import { apiInstance } from "../constants/apiInstance";
import { utilsResponse } from "../types/utils";
import {
  filterGetStaffAccount,
  setStatus,
  UpdateProfile,
} from "../types/account";

const api = apiInstance({
  baseURL: "http://localhost:8080/moderator",
});

export const manageModerator = {
  getAllPostProduct: () =>
    api.get<utilsResponse<any>>(`/view-create-post-product`),
};
