type Props = { pageParam?: number };
export async function getPostRecommends({pageParam}:Props) {
  const res = await fetch(`/api/postRecommends?cursor=${pageParam}`, {
    next: {
      tags: ['posts', 'recommends']
    },
    cache: 'force-cache',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json();
}