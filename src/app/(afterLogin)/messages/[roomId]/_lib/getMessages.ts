import { QueryFunction } from "@tanstack/query-core";
import { Message } from "@/model/Message";

export const getMessages:QueryFunction<Message, [_1: string, _2: string]> = async({queryKey}) => {
  const [_1, messageId] = queryKey;
  const res = await fetch(`/api/messages/${messageId}`, {
    next: { tags: ['message', messageId] },
    credentials: 'include',
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  const data = await res.json();
  return data;
}