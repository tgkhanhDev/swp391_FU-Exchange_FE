import { apiInstance } from "../constants/apiInstance";
import { utilsResponse } from "../types/utils";
import { ModeratorGetPostFilter, ModeratorUpdateStatusPostProductFilter, Post } from "../types/post";

const api = apiInstance({
  baseURL: "http://localhost:8080/moderator",
});

export const manageModerator = {
  getAllPostProduct: (payload: ModeratorGetPostFilter) =>
    api.get<utilsResponse<Post>>(`/filter-post-product?page=${payload.page}
      ${
        payload.sellerName != undefined && payload.sellerName.length > 0
          ? `&sellerName=${payload.sellerName}`
          : ``
      }
      ${payload.postStatus !== 0 ? `&postStatus=${payload.postStatus}` : ``}`),
  updateStatusPostProduct: (payload: ModeratorUpdateStatusPostProductFilter) =>
    api.put<any>(`/update/status-post-product`, payload),
};
