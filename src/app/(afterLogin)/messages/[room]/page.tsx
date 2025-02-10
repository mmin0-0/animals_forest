import React from "react";
import * as style from '@/app/styles/pages/messages.css';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';
import MessageForm from '@/app/(afterLogin)/messages/[room]/_component/MessageForm';
import { auth } from '@/auth';
import { getUserServer } from '@/app/(afterLogin)/[username]/_lib/getUserServer';
import { QueryClient } from '@tanstack/react-query';
import UserInfo from '@/app/(afterLogin)/messages/[room]/_component/UserInfo';
import MessageList from '@/app/(afterLogin)/messages/[room]/_component/MessageList';

dayjs.locale('ko');
dayjs.extend(relativeTime)

type Props = {
  params: { room: string },
}
export default async function ChatRoom({ params }: Props) {
  const session = await auth();
  const queryClient = new QueryClient();
  const ids = params.room.split('-').filter((v) => v !== session?.user?.email);
  if (!ids[0]) {
    return null;
  }
  await queryClient.prefetchQuery({queryKey: ['users', ids[0]], queryFn: getUserServer})

  return (
    <main>
      <style.RoomMain>
        <UserInfo />
        <MessageList />
        <MessageForm />
      </style.RoomMain>
    </main>
  )
}