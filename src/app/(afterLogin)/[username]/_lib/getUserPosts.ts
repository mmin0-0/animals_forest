import { Post } from "@/model/Post";
import { QueryFunction } from "@tanstack/react-query";

export const getUserPosts:QueryFunction<Post[], [_1: string, _2: string, string]> = async ({queryKey}) => {
  const [_1, _2, username] = queryKey;
  const res = await fetch(`/api/users/${username}/posts?cursor=0`, {
    next: {
      tags: ['posts', 'users', username],
    },
    credentials: 'include'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json();
}