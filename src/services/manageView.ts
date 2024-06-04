import { apiInstance } from "../constants/apiInstance";
import { Campus, PostType } from "../types/post";
import { utilsResponse } from "../types/utils";

const api = apiInstance({
  baseURL: "http://localhost:8080",
});
export const manageView = {
  getAllCampus: () => api.get<utilsResponse<Campus[]>>(`/campus`),
  getAllPostType: () => api.get<utilsResponse<PostType[]>>(`/post-type`),
};
