import { apiInstance } from "../constants/apiInstance"

const api = apiInstance({
  baseURL: "http://localhost:8080",
});

export const manageProduct = {
    getProject : () => api.get("/project"),
}