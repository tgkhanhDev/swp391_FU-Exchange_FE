import { apiInstance } from "../constants/apiInstance";
import { Post, PostFilter_API, PostLoadMore } from "../types/post";

const api = apiInstance({
  baseURL: "http://localhost:8080/post-product",
});

export const managePost = {
  getPost: (payload: PostFilter_API) =>
    api.get<PostLoadMore>(
      `/${payload.current}?campusId=${payload.campusId}&postTypeId=${payload.postTypeId}&name=${payload.name}`
    ),
  getPostById:(payload: number) => 
      api.get<Post>(`/detail/${payload}`),
};