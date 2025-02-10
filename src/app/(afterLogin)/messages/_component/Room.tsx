'use client';
import * as style from '@/app/styles/pages/messages.css';
import {faker} from "@faker-js/faker";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';
import { useRouter } from 'next/navigation';
import { Strong, Span } from '@/app/_component/Text';

dayjs.locale('ko');
dayjs.extend(relativeTime);

export default function Room(){
  const router = useRouter();
  const user = {
    id: 'hero',
    nickname: '영웅',
    Messages: [
      {roomId: 123, content: '안녕하세요.', createdAt: new Date()},
      {roomId: 123, content: '안녕히가세요.', createdAt: new Date()},
    ],
  };

  const onClick =() => {
    router.push(`/messages/${user.Messages.at(-1)?.roomId}`);
  };
  
  return (
    <style.RoomWrap onClickCapture={onClick}>
      <style.UserImg>
        <img src={faker.image.avatar()} alt=""/>
      </style.UserImg>
      <style.RoomChatInfo>
        <style.RoomUserInfo>
          <Strong styleProps={{weight: 'bold'}}>{user.nickname}</Strong>
          &nbsp;
          <Span styleProps={{weight: 'medium'}}>{user.id}</Span>
          &nbsp;
          &nbsp;
          <Span>{dayjs(user.Messages?.at(-1)?.createdAt).fromNow(true)}</Span>
        </style.RoomUserInfo>
        <style.RoomLastChat>
          {user.Messages?.at(-1)?.content}
        </style.RoomLastChat>
      </style.RoomChatInfo>
    </style.RoomWrap>
  )
}