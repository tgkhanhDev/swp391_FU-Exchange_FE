import { apiInstance } from "../constants/apiInstance";
import { addCartItem, deleteItemCartType } from "../types/cart";
import { Post, PostFilter_API, PostLoadMore } from "../types/post";
import { utilsResponse } from "../types/utils";

const api = apiInstance({
  baseURL: "http://localhost:8080/cart",
});

export const manageCart = {
  viewCart: (payload: string) => api.get(`/${payload}`),
  addToCart: (payload: addCartItem) => api.post(``, payload),
  updateQuantity: (payload) => api.put(`/cart-update`, payload),
  // deleteItemCart: (payload: deleteItemCartType) =>
  //   api.delete(`/cart-delete`, payload),
  // pay_vnpay: (payload: string) => api.get(`/vn-pay?amount=${payload}`),

};
