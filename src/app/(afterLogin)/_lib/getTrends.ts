export async function getTrend() {
  const res = await fetch(`/api/trends`, {
    next: {
      tags: ['trends']
    },
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json();
}