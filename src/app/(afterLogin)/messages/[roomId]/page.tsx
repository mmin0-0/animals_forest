import React from "react";
import * as style from '@/app/styles/pages/messages.css';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';
import MessageForm from '@/app/(afterLogin)/messages/[roomId]/_component/MessageForm';
import UserInfo from '@/app/(afterLogin)/messages/[roomId]/_component/UserInfo';
import MessageList from '@/app/(afterLogin)/messages/[roomId]/_component/MessageList';
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getMessages } from "./_lib/getMessages";

dayjs.locale('ko');
dayjs.extend(relativeTime)

type Props = {params: { messageId: string}};
export default async function ChatRoom({params}: Props) {
  const { messageId } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['message', messageId],
    queryFn: getMessages,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <main>
      <style.RoomMain>
        <HydrationBoundary state={dehydratedState}>
        <UserInfo messageId={messageId} />
        <MessageList />
        <MessageForm />
        </HydrationBoundary>
      </style.RoomMain>
    </main>
  )
}