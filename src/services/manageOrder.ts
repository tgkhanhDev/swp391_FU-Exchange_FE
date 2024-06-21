import { apiInstance } from "../constants/apiInstance";
import { PaymentType , Orders, PostProductInOrder  } from "../types/order";
import { Post, PostFilter_API, PostLoadMore } from "../types/post";
import { utilsResponse } from "../types/utils";

const api = apiInstance({ 
  baseURL: "http://localhost:8080/student",
});

export const manageOrder = {
  pay_cod: (payload: PaymentType) => api.post(`/payment/pay-order`, payload),
  pay_vnpay: (payload: PaymentType) => api.post(`/payment/vn-pay`, payload),
  orderBuy: (payload: Orders ) => api.get<utilsResponse<Orders[]>>(`order/${payload.registeredStudent}`),
  orderBuyDetail: (payload: Orders) => {
    return api.get<utilsResponse<PostProductInOrder[]>>(`order-detail/${payload.registeredStudent}/${payload.orderId}?orderStatusId=${payload.orderStatus.orderStatusId}`);
  },
  //registerStudentId/orderId
};
