import { QueryFunction } from "@tanstack/query-core";
import { Message } from "@/model/Message";

export const getMessages:QueryFunction<Message, [_1: string, _2: string]> = async({queryKey}) => {
  const [_1, messageId] = queryKey;
  console.log("Extracted messageId:", messageId, typeof messageId);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/messages/${messageId}`, {
    next: {
      tags: ['message', messageId],
    },
    credentials: 'include'
  });

  console.log('fetching message with id:', messageId);

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}