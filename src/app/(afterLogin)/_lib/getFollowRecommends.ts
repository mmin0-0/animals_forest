export async function getFollowRecommends() {
  const res = await fetch(`/api/followRecommends`, {
    next: {
      tags: ['users', 'followRecommends'], 
    },
    credentials: 'include',
    cache: 'force-cache',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json();
}