import { NextRequest, NextResponse } from 'next/server';

export async function getUsers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);

  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }

  return res.json();
}

export async function GET(request: NextRequest) {
  try {
    const users = await getUsers();  // API에서 유저 정보 가져오기
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch users', error: error.message }, { status: 500 });
  }
}
