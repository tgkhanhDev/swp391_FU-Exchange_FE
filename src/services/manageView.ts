import { apiInstance } from "../constants/apiInstance";
import { utilsResponse } from "../types/utils";
import { Campus, PostType, Category } from "../types/post";

const api = apiInstance({
  baseURL: "http://localhost:8080",
});
export const manageView = {
  getAllCampus: () => api.get<utilsResponse<Campus[]>>(`/campus`),
  getAllPostType: () => api.get<utilsResponse<PostType[]>>(`/post-type`),
  getAllCategory: () => api.get<utilsResponse<Category[]>>(`/category-type`),
};
