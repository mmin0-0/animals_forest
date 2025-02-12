'use client';
import * as style from '@/app/styles/pages/messages.css';
import {faker} from "@faker-js/faker";
import { PageHeader } from '@/app/styles/component/afterLayout.css';
import { BackButton } from '@/app/_component/Button';
import { Typography } from '@/app/_component/Text';

type Props = {room: string};
export default function UserInfo({room}:Props) {
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
        <Typography as="h4" styleProps={{weight: "semiBold"}}>{user.nickname}</Typography>
      </PageHeader>
      <style.ChatUserInfo href={`/${user.id}`}>
        <img src={user.image} alt="user profile" />
        <Typography as="strong" styleProps={{weight: "semiBold"}}>{user.nickname}</Typography>
        <Typography as="span" styleProps={{weight: "medium"}}>@{user.id}</Typography>
      </style.ChatUserInfo>
    </>
  )
}