import axios from "axios";

export const apiInstance = (config) => {
  const api = axios.create(config);
  api.interceptors.request.use((config) => {
    return {
      ...config,
      headers: {
        //  TokenCybersoft:TOKEN_CYBERSOFT,
        //  Authorization:"Bearer"+" "+localStorage.getItem("USER"),
      },
    };
  });
  return api;
};
