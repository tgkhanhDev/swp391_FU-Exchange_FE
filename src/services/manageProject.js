import { apiInstance } from "../constants/apiInstance"

const api = apiInstance({
  baseURL: "http://localhost:8080",
});

export const manageProject = {
    getProject : () => api.get("/project"),
}