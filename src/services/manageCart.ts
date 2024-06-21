import { apiInstance } from "../constants/apiInstance";
import { deleteItemCartType, viewItemCart } from "../types/cart";
import { CodPayment } from "../types/order";
import { utilsResponse } from "../types/utils";

const api = apiInstance({
  baseURL: "http://localhost:8080/cart",
});

export const manageCart = {
  viewCart: (payload: viewItemCart) => 
    api.get<utilsResponse<viewItemCart[]>>(`/${payload}`),
  addToCart: (payload) => api.post(``, payload),
  updateQuantity: (payload) => api.put(`/cart-update`, payload),
  //deleteItemCart: (payload:deleteItemCartType) => api.delete(`/cart-delete`,payload),

  // pay_vnpay: (payload: string) => api.get(`/vn-pay?amount=${payload}`),
};
