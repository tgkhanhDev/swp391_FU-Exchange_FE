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