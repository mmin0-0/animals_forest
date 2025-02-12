import { User } from "@/model/User";

export interface Message {
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