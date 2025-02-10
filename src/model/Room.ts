import { User } from "@/model/User";

export interface Room {
  roomId: string,
  Receiver: User,
  Sender: User,
  content: string,
  createdAt: Date,
}