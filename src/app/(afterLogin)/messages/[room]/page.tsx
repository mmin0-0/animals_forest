import React from "react";
import * as style from '@/app/styles/pages/messages.css';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';
import MessageForm from '@/app/(afterLogin)/messages/[room]/_component/MessageForm';
import UserInfo from '@/app/(afterLogin)/messages/[room]/_component/UserInfo';
import MessageList from '@/app/(afterLogin)/messages/[room]/_component/MessageList';

dayjs.locale('ko');
dayjs.extend(relativeTime)

type Props = { params: Promise<{ room: string }> };
export default async function ChatRoom(props: Props) {
  const { room } = await props.params;
  return (
    <main>
      <style.RoomMain>
          <UserInfo room={room} />
          <MessageList />
          <MessageForm />
      </style.RoomMain>
    </main>
  )
}