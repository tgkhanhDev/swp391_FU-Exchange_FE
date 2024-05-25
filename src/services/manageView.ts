import { apiInstance } from "../constants/apiInstance";
import { Campus } from "../types/post";

const api = apiInstance({
  baseURL: "http://localhost:8080",
});
export const manageView = {
  getAllCampus: () =>
    api.get<Campus[]>(`/campus`),
};
