'use client';
import * as style from '@/app/styles/pages/messages.css';
import {faker} from "@faker-js/faker";
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
    router.push(`/messages/${room.roomId}`);
  };
  
  return (
    <style.RoomWrap onClickCapture={onClick}>
      <style.UserImg>
        <img src={`${room.Receiver.image}`} alt=""/>
      </style.UserImg>
      <style.RoomChatInfo>
        <style.RoomUserInfo>
          <Typography as="strong" styleProps={{weight: "bold"}}>{room.Receiver.nickname}</Typography>
          &nbsp;
          <Typography as="span" styleProps={{weight: "medium", color: 'secondary'}}>{room.Receiver.id}</Typography>
          &nbsp;
          &nbsp;
          <Typography as="span">{dayjs(room.Messages.createdAt).fromNow(true)}</Typography>
        </style.RoomUserInfo>
        <style.RoomLastChat>
          {room.Messages.content.SenderMessage}
        </style.RoomLastChat>
      </style.RoomChatInfo>
    </style.RoomWrap>
  )
}