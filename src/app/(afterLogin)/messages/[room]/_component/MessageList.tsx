'use client';
import * as style from '@/app/styles/pages/messages.css';
import { P } from '@/app/_component/Text';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';
import { faker } from "@faker-js/faker";

dayjs.locale('ko');
dayjs.extend(relativeTime);

export default function MessageList() {
  const user = {
    id: 'hero',
    nickname: '영웅',
    image: faker.image.avatar(),
  }
  const messages = [
    { messageId: 1, roomId: 123, id: 'test', content: '안녕하세요.', createdAt: new Date() },
    { messageId: 2, roomId: 123, id: 'test01', content: '안녕히가세요.', createdAt: new Date() },
  ];

  return (
    <style.ChatInfo>
      <style.ChatContent>
        {messages.map((m) => {
          if (m.id === 'test') {
            return (
              <style.Message key={m.messageId} className="myMessage">
                <style.MessageContent>{m.content}</style.MessageContent>
                <P styleProps={{ size: 'xsmall' }}>{dayjs(m.createdAt).format('YYYY년 MM월 DD일 A HH시 mm분')}</P>
              </style.Message>
            )
          }
          return (
            <style.Message key={m.messageId} className="yourMessage">
              <style.MessageContent>{m.content}</style.MessageContent>
              <P styleProps={{ size: 'xsmall' }}>{dayjs(m.createdAt).format('YYYY년 MM월 DD일 A HH시 mm분')}</P>
            </style.Message>
          )
        })}
      </style.ChatContent>
    </style.ChatInfo>
  )
}