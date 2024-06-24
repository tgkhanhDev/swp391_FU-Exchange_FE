import { apiInstance } from "../constants/apiInstance";
import { utilsResponse } from "../types/utils";
import { createWishlist } from "../types/wishlist"

const api = apiInstance({
  baseURL: "http://localhost:8080/wishlist",
});

export const manageWishlist = {
  viewWishlist: (payload: number) => 
    api.get<utilsResponse<any>>(`${payload}`),
  createWishlist : (payload: createWishlist) =>
    api.post<utilsResponse<any>>(`create`, payload)
};
