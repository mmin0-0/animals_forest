type Props = {pageParam?: number};
export async function getFollowingPosts({pageParam}:Props) {
  const res = await fetch(`/api/followingPosts?cursor=${pageParam}`, {
    next: {
      tags: ['posts', 'followings']
    },
    // credentials: 'include',
    cache: 'force-cache',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json();
}