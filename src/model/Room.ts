import { User } from "@/model/User";

export interface Room {
  messageId: number,
  roomId: string,
  Sender: User,
  Receiver: User,
  content: {
    SenderMessage: string,
    ReceiverMessage: string
  },
  createdAt: Date,
}