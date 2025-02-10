'use client';
import * as style from '@/app/styles/pages/messages.css';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';
import { useRouter } from 'next/navigation';
import { Strong, Span } from '@/app/_component/Text';
import { Room as IRoom } from '@/model/Room';
import { useSession } from "next-auth/react";

dayjs.locale('ko');
dayjs.extend(relativeTime);

type Props = {room: IRoom};
export default function Room({room}: Props){
  const { data:session } = useSession();
  const router = useRouter();
  const onClick =() => {
    router.push(`/messages/${room.room}`);
  };
  const user = room.Receiver.id === session?.user?.email ? room.Sender : room.Receiver;
  
  return (
    <style.RoomWrap onClickCapture={onClick}>
      <style.UserImg>
        <img src={user.image} alt={user.nickname}/>
      </style.UserImg>
      <style.RoomChatInfo>
        <style.RoomUserInfo>
          <Strong styleProps={{weight: 'bold'}}>{user.nickname}</Strong>
          &nbsp;
          <Span styleProps={{weight: 'medium'}}>{user.id}</Span>
          &nbsp;
          &nbsp;
          <Span>{dayjs(room.createdAt).fromNow(true)}</Span>
        </style.RoomUserInfo>
        <style.RoomLastChat>
          {room.content}
        </style.RoomLastChat>
      </style.RoomChatInfo>
    </style.RoomWrap>
  )
}