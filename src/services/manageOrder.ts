import { apiInstance } from "../constants/apiInstance";
import { PaymentType , Orders, PostProductInOrder  } from "../types/order";
import { Post, PostFilter_API, PostLoadMore } from "../types/post";
import { utilsResponse } from "../types/utils";

const apiPayment = apiInstance({
  baseURL: "http://localhost:8080/order",
});

const apiOrder = apiInstance({
  baseURL: "http://localhost:8080/student",
});

export const manageOrder = {
  pay_cod: (payload: PaymentType) => apiPayment.post(`/payment/pay-order`, payload),
  pay_vnpay: (payload: PaymentType) => apiPayment.post(`/payment/vn-pay`, payload),
  orderBuy: (payload: Orders ) => apiOrder.get<utilsResponse<Orders[]>>(`order/${payload.registeredStudent}`),
  orderBuyDetail: (payload: Orders) => {
    return apiOrder.get<utilsResponse<PostProductInOrder[]>>(`order-detail/${payload.registeredStudent}/${payload.orderId}?orderStatusId=${payload.orderStatus.orderStatusId}`);
  },
  //registerStudentId/orderId
};
