import { apiInstance } from "../constants/apiInstance";
import { Campus, PostType, Category } from "../types/post";

const api = apiInstance({
  baseURL: "http://localhost:8080",
});
export const manageView = {
  getAllCampus: () => api.get<Campus[]>(`/campus`),
  getAllPostType: () => api.get<PostType[]>(`/post-type`),
  getAllCategory: () => api.get<Category[]>(`/category-type`),
};
