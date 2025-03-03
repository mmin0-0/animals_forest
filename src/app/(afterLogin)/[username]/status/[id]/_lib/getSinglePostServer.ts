import {cookies} from "next/headers";

export const getSinglePostServer = async ({ queryKey }: { queryKey: [string, string ]}) => {
  const [_1, id] = queryKey;
  const res = await fetch(`/api/posts/${id}`, {
    next: {
      revalidate: 3600,
      tags: ['posts', id],
    },
    credentials: 'include',
    headers: {Cookie: (await cookies()).toString()},

  });

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}