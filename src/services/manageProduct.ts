import { apiInstance } from "../constants/apiInstance"

const api = apiInstance({
  baseURL: "http://localhost:8080/product",
});

export const manageProduct = {
  getProductById: (payload: number) => api.get(`/detail/${payload}`),
  getProductByVariationDetail: (payload: number[]) =>
    api.post(`/get-by-variation`, payload),
};