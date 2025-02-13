import { QueryFunction } from "@tanstack/query-core";
import { Message } from "@/model/Message";

export const getMessages:QueryFunction<Message, [_1: string, _2: string]> = async({queryKey}) => {
  const [_1, messageId] = queryKey;
  console.log("Extracted messageId:", messageId, typeof messageId);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/messages/${messageId}`, {
    next: { tags: ['message', messageId] },
    credentials: 'include',
  });
  
  console.log('fetching message with id:', messageId); // 요청할 때 messageId 확인
  console.log('response status:', res.status); // 응답 상태 코드 확인
  
  if (!res.ok) {
    console.error('Failed to fetch data', await res.text()); // 실패 시 응답 내용 출력
    throw new Error('Failed to fetch data');
  }
  
  const data = await res.json();
  console.log('Fetched data:', data); // 받은 데이터 로그 확인
  return data;
}