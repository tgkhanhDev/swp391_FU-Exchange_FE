import { apiInstance } from "../constants/apiInstance";
import { PaymentType, Orders, PostProductInOrder, orderDetailSellerId, updateStatusOrder, PostProductInOrders } from "../types/order";
import { Post, PostFilter_API, PostLoadMore } from "../types/post";
import { utilsResponse } from "../types/utils";

const apiPayment = apiInstance({
  baseURL: "http://trangiangkhanh.site:8090/order",
});

const apiOrder = apiInstance({
  baseURL: "http://trangiangkhanh.site:8090/student",
});

const apiC = apiInstance({
  baseURL: "http://trangiangkhanh.site:8090/seller",
})

export const manageOrder = {
  pay_cod: (payload: PaymentType) =>
    apiPayment.post(`/payment/pay-order`, payload),
  pay_vnpay: (payload: PaymentType) =>
    apiPayment.post(`/payment/vn-pay`, payload),
  orderBuy: (payload: number) =>
    apiOrder.get<utilsResponse<PostProductInOrders[]>>(`order/${payload}`),
  //registerStudentId/orderId

  orderBuySeller: (payload: number) =>
    apiC.get<utilsResponse<Orders[]>>(`order/${payload}`),

  orderBuyDetailSeller: (payload: orderDetailSellerId) => 
    apiC.get<utilsResponse<PostProductInOrder[]>>(`order-detail/${payload.sellerId}/${payload.orderId}`),

  updateStatusOrder: (payload: updateStatusOrder) =>
    apiPayment.put<utilsResponse<PostProductInOrder[]>>(`update`, payload),
};
