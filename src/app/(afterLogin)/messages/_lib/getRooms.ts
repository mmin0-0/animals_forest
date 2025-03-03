import { QueryFunction } from "@tanstack/query-core";
import { Room as IRoom } from "@/model/Room";

export const getRooms:QueryFunction<IRoom[], [_1: string, _2: string]> = async({queryKey}) => {
  const [_1, roomId] = queryKey;
  const res = await fetch(`/api/messages/${roomId}`, {
    next: {
      tags: ['rooms', roomId],
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}