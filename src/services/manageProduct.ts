import { apiInstance } from "../constants/apiInstance"
import { ProductPaymentType, createProductType, filterGetProductById } from "../types/product";
import { utilsResponse } from "../types/utils";

const api = apiInstance({
  baseURL: "http://trangiangkhanh.site:8090/product",
});

export const manageProduct = {
  getProductById: (payload: number) => api.get(`/detail/${payload}`),
  getProductByVariationDetail: (payload: number[]) =>
    api.post<utilsResponse<ProductPaymentType>>(`/get-by-variation`, payload),
  createProduct: (payload: createProductType) =>
    api.post<utilsResponse<any>>(`/create-product`, payload),
  getProductByStudentId: (payload: filterGetProductById) =>
    api.get<utilsResponse<any>>(`/${payload.current}?name=${payload.name}&studentId=${payload.studentId}`),
  deleteProductId: (payload: number) => api.put<any>(`/delete-product`, payload),
};