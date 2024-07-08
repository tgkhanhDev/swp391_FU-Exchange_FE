import { apiInstance } from "../constants/apiInstance";
import { PaymentType, Orders, PostProductInOrder, orderDetailSellerId, updateStatusOrder, TotalOrderPost} from "../types/order";
import { Post, PostFilter_API, PostLoadMore } from "../types/post";
import { utilsResponse } from "../types/utils";

const apiPayment = apiInstance({
  baseURL: "http://localhost:8080/order",
});

const apiOrder = apiInstance({
  baseURL: "http://localhost:8080/student",
});

const apiB = apiInstance({
  baseURL: "http://localhost:8080/orderPostProduct",
});

const apiC = apiInstance({
  baseURL: "http://localhost:8080/seller",
})

export const manageOrder = {
  pay_cod: (payload: PaymentType) =>
    apiPayment.post(`/payment/pay-order`, payload),
  pay_vnpay: (payload: PaymentType) =>
    apiPayment.post(`/payment/vn-pay`, payload),
  orderBuy: (payload: Orders) =>
    apiOrder.get<utilsResponse<Orders[]>>(`order/${payload.registeredStudent}`),
  orderBuyDetail: (payload: Orders) => {
    return apiOrder.get<utilsResponse<PostProductInOrder[]>>(
      `order-detail/${payload.registeredStudent}/${payload.orderId}`
    );
  },

  getOrderPostProduct: (payload: number) => {
    return apiB.get<utilsResponse<any>>(`${payload}`);
  },
  //registerStudentId/orderId

  orderBuySeller: (payload: number) =>
    apiC.get<utilsResponse<Orders[]>>(`order/${payload}`),

  orderBuyDetailSeller: (payload: orderDetailSellerId) =>
    apiC.get<utilsResponse<PostProductInOrder[]>>(`order-detail/${payload.sellerId}/${payload.orderId}`),

  updateStatusOrder: (payload: updateStatusOrder) =>
    apiPayment.put<utilsResponse<PostProductInOrder[]>>(`update`, payload),

  getPriceOrderPost: (payload: number) =>
    apiB.get<utilsResponse<TotalOrderPost[]>>(`${payload}`),
};
