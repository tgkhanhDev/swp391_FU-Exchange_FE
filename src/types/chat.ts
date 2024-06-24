export interface ChatRoom {
  chatRoomId: number;
  active: boolean;
  chatMessage: ChatMessage[];
}

export interface ChatMessage {
  chatMessageId: number;
  chatRoom: number;
  studentSendId: number;
  studentReceiveId: number;
  content: string;
  timeSend: Date;
}

export interface StudentToSellerChat {
  registeredStudentId: number;
  sellerId: number;
}

export interface SendMessage {
  studentSendId: number;
  studentReceiveId: number;
  chatRoomId: number;
  content: string;
}

export interface ContactSeller {
  registeredStudentId: number;
  sellerId: number;
  content: string;
}

