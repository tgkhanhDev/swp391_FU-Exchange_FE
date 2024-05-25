import { apiInstance } from "../constants/apiInstance";
import { PostLoadMore } from "../types/post";

const api = apiInstance({
  baseURL: "http://localhost:8080",
});

export const managePost = {
  getPost: (payload:number) => api.get<PostLoadMore>(`/post-product/${payload}`),
};
