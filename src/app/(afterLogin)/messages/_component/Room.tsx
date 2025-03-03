'use client';
import * as style from '@/app/styles/pages/messages.css';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';
import { useRouter } from 'next/navigation';
import { Typography } from '@/app/_component/Text';
import { Room as IRoom } from '@/model/Room';

dayjs.locale('ko');
dayjs.extend(relativeTime);

type Props = {room: IRoom};
export default function Room({room}:Props){
  const router = useRouter();
  const onClick =() => {
    router.push(`/messages/${room.messageId}`);
  };
  
  return (
    <style.RoomWrap onClickCapture={onClick}>
      <a href={`/messages/${room.messageId}`}></a>
      <style.UserImg>
        <img src={room.Sender.image} alt={room.Sender.id}/>
      </style.UserImg>
      <style.RoomChatInfo>
        <style.RoomUserInfo>
          <Typography as="strong" styleProps={{weight: "bold"}}>{room.Sender.nickname}</Typography>
          &nbsp;
          <Typography as="span" styleProps={{weight: "medium", color: 'secondary'}}>{room.Sender.id}</Typography>
          &nbsp;
          &nbsp;
          <Typography as="span">{dayjs(room.createdAt).fromNow(true)}</Typography>
        </style.RoomUserInfo>
        <style.RoomLastChat>
          {room.content.ReceiverMessage}
        </style.RoomLastChat>
      </style.RoomChatInfo>
    </style.RoomWrap>
  )
}