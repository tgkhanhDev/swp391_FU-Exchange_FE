import { apiInstance } from "../constants/apiInstance";
import { utilsResponse } from "../types/utils";
import { createWishlist, updateStatusWishlist, updateQuantityWishlist } from "../types/wishlist"

const api = apiInstance({
  baseURL: "http://localhost:8080/wishlist",
});

export const manageWishlist = {
  viewWishlist: (payload: number) =>
    api.get<utilsResponse<any>>(`${payload}`),
  createWishlist: (payload: createWishlist) =>
    api.post<utilsResponse<any>>(`create`, payload),
  updateStatusWishlist: (payload: updateStatusWishlist) =>
    api.put<utilsResponse<any>>(`${payload.wishListId}/update-status?active=${payload.active}`),
  updateQuantityWishlist: (payload: updateQuantityWishlist) =>
    api.put<utilsResponse<any>>(`${payload.wishListId}/update-quantity?quantity=${payload.quantity}`),
  deleteWishlist : (payload: number) => 
    api.delete<utilsResponse<any>>(`${payload}`),
};
