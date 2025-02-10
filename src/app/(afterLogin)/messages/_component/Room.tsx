'use client';
import * as style from '@/app/styles/pages/messages.css';
import {faker} from "@faker-js/faker";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';
import { useRouter } from 'next/navigation';
import { Strong, Span } from '@/app/_component/Text';
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
        {/* <img src={faker.image.avatar()} alt=""/> */}
        <img src={`${room.Receiver.image}`} alt=""/>
      </style.UserImg>
      <style.RoomChatInfo>
        <style.RoomUserInfo>
          <Strong styleProps={{weight: 'bold'}}>{room.Receiver.nickname}</Strong>
          &nbsp;
          <Span styleProps={{weight: 'medium'}}>{room.Receiver.id}</Span>
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