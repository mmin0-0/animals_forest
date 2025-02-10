'use client';
import * as style from '@/app/styles/pages/messages.css';
import {faker} from "@faker-js/faker";
import { PageHeader } from '@/app/styles/component/afterLayout.css';
import { BackButton } from '@/app/_component/Button';
import { H4, Strong, Span } from '@/app/_component/Text';

export default function UserInfo() {
  const user = {
    id: 'hero',
    nickname: '영웅',
    image: faker.image.avatar(),
  }
  const messages = [
    {messageId: 1, roomId: 123, id: 'zerohch0',  content: '안녕하세요.', createdAt: new Date()},
    {messageId: 2, roomId: 123, id: 'hero', content: '안녕히가세요.', createdAt: new Date()},
  ];

  if(!user){
    return null;
  }
  
  return (
    <>
      <PageHeader>
        <BackButton />
        <H4 styleProps={{ weight: 'semiBold' }}>{user.nickname}</H4>
      </PageHeader>
      <style.ChatUserInfo href={`/${user.id}`}>
        <img src={user.image} alt="user profile" />
        <Strong styleProps={{ weight: 'semiBold' }}>{user.nickname}</Strong>
        <Span styleProps={{ weight: 'medium' }}>@{user.id}</Span>
      </style.ChatUserInfo>
    </>
  )
}