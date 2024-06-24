import { apiInstance } from "../constants/apiInstance";
import { utilsResponse } from "../types/utils";
import { StudentToSellerChat, SendMessage, ContactSeller } from "../types/chat"

const api = apiInstance({
  baseURL: "http://localhost:8080/chat",
});

export const manageChat = {
  chatRoom: (payload: number) =>
    api.get<utilsResponse<any>>(`chat-room/${payload}`),

  chatRoomStS: (payload: StudentToSellerChat) =>
    api.get<utilsResponse<any>>(`chat-room/student-to-seller?registeredStudentId=${payload.registeredStudentId}&sellerId=${payload.sellerId}`),

  sendMessage: (payload: SendMessage) => 
    api.post<utilsResponse<any>>(`send-message`, payload),

  contactSeller: (payload: ContactSeller) => 
    api.post<utilsResponse<any>>(`contact-to-seller`, payload),
};
