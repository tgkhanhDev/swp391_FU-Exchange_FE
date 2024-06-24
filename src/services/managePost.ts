import { apiInstance } from "../constants/apiInstance";
import { PostProduct } from "../types/order";
import { CreatePostType, Post, PostFilter_API, PostLoadMore } from "../types/post";
import { utilsResponse } from "../types/utils";

const api = apiInstance({
  baseURL: "http://localhost:8080/post-product",
});

export const managePost = {
  getPost: (payload: PostFilter_API) =>
    api.get<PostLoadMore>(
      `/${payload.current}?campusId=${payload.campusId}&postTypeId=${payload.postTypeId}&name=${payload.name}`
    ),
  getPostById: (payload: number) =>
    api.get<utilsResponse<Post>>(`/detail/${payload}`),
  createPost: (payload: CreatePostType) => api.post<any>(`/create`, payload),
  getPostByRegId: (payload: number) =>
    api.get<PostProduct>(`/seller-post-product-by-regId/${payload}`),
};
