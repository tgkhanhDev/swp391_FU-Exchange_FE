import { apiInstance } from "../constants/apiInstance";
import { PostFilter_API, PostLoadMore } from "../types/post";

const api = apiInstance({
  baseURL: "http://localhost:8080",
});

export const managePost = {
  getPost: (payload: PostFilter_API) =>
    api.get<PostLoadMore>(
      `/post-product/${payload.current}?campusId=${payload.campusId}&postTypeId=${payload.postTypeId}&name=${payload.name}`
    ),
};
