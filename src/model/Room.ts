import { User } from "@/model/User";

export interface Room {
  roomId: string,
  Receiver: User,
  Sender: User,
  Messages: {
    content: {
      ReceiverMessage: string, 
      SenderMessage: string, 
    },
    createdAt: Date,
  };
}