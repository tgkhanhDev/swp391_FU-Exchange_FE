import { apiInstance } from "../constants/apiInstance"
import { ProductPaymentType, createProductType } from "../types/product";
import { utilsResponse } from "../types/utils";

const api = apiInstance({
  baseURL: "http://localhost:8080/product",
});

export const manageProduct = {
  getProductById: (payload: number) => api.get(`/detail/${payload}`),
  getProductByVariationDetail: (payload: number[]) =>
    api.post<utilsResponse<ProductPaymentType>>(`/get-by-variation`, payload),
  createProduct: (payload: createProductType) => 
    api.post<utilsResponse<any>>(`create-product`, payload),
};