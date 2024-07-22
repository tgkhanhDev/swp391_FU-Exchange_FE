import axios from "axios";
import { useAppDispatch } from "../store";
import { setProductEmpty } from "../store/productManagement/slice";

export const apiInstance = (config) => {
  const api = axios.create(config);

  api.interceptors.request.use((config) => {
    const username = "HE180000";
    const password = "123";
    const auth = btoa(`${username}:${password}`);

    return {
      ...config,
      headers: {
        ...config.headers,
        "Content-Type": "application/json",
        Authorization: "Basic " + auth,
      },
    };
  });

  return api;
};
