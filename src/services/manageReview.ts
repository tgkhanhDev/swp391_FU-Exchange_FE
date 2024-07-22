import { apiInstance } from "../constants/apiInstance";
import { utilsResponse } from "../types/utils";
import { Review } from "../types/review"

const api = apiInstance({
  baseURL: "http://localhost:8080/review",
});

export const manageReview = {
  createReview: (payload: Review) =>
  {
    console.log(payload)
    return api.post<utilsResponse<any>>(`/create`, payload);
  },
  viewAllReview: (payload: number) =>
    api.get<utilsResponse<any>>(`all/${payload}`),
};
