import { QueryFunction } from "@tanstack/query-core";
import { Message } from "@/model/Message";

export const getMessages:QueryFunction<Message, [_1: string, _2: string]> = async({queryKey}) => {
  const [_1, roomId] = queryKey;
  console.log("Extracted roomId:", roomId, typeof roomId);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/messages/${roomId}`, {
    next: {
      tags: ['rooms', roomId],
    },
  });
  console.log('fetching room id', roomId)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}