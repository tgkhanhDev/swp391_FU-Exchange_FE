import { apiInstance } from "../constants/apiInstance";
import { addCartItem, deleteItemCartType, updateItemCartType } from "../types/cart";
import { Post, PostFilter_API, PostLoadMore } from "../types/post";
import { utilsResponse } from "../types/utils";

const api = apiInstance({
  baseURL: "http://trangiangkhanh.site:8090/cart",
});

export const manageCart = {
  viewCart: (payload: string) => api.get(`/${payload}`),
  addToCart: (payload: addCartItem) => api.post(`/add-to-cart`, payload),
  updateQuantity: (payload: updateItemCartType) =>
    api.put(`/update-cart`, payload),
  deleteItemCart: (payload: addCartItem) =>
    api.delete(`/cart-delete`, { data: payload }),
  // pay_vnpay: (payload: string) => api.get(`/vn-pay?amount=${payload}`),
};
