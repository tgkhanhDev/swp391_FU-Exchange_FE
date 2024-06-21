import { apiInstance } from "../constants/apiInstance";
import { deleteItemCartType, viewItemCart } from "../types/cart";
import { CodPayment } from "../types/order";
import { utilsResponse } from "../types/utils";

const api = apiInstance({
  baseURL: "http://localhost:8080/chat",
});

export const manageChat = {
  chatRoom: (payload: number) => 
    api.get<utilsResponse<any>>(`chat-room/${payload}`),
};
