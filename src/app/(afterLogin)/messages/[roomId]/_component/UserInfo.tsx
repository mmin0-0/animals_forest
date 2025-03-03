'use client';
import * as style from '@/app/styles/pages/messages.css';
import { faker } from "@faker-js/faker";
import { PageHeader } from '@/app/styles/component/afterLayout.css';
import { BackButton } from '@/app/_component/Button';
import { Typography } from '@/app/_component/Text';
import { Message } from '@/model/Message';
import { useQuery } from '@tanstack/react-query';
import { getMessages } from '@/app/(afterLogin)/messages/[roomId]/_lib/getMessages';

type Props = { messageId: string };
export default function UserInfo({messageId}:Props) {
  const user = { id: 'test01', nickname: 'kk', image: '/images/user/profile01.png'};
  const { data:message } = useQuery<Message, Object, Message, [_1: string, _2: string]>({
    queryKey: ['message', messageId],
    queryFn: getMessages,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return (
    <>
      <PageHeader>
        <BackButton />
        <Typography as="h4" styleProps={{ weight: "semiBold" }}>{user.nickname}</Typography>
      </PageHeader>
      <style.ChatUserInfo href={`/${user.id}`}>
        <img src={user.image} alt="user profile" />
        <Typography as="strong" styleProps={{ weight: "semiBold" }}>{user.nickname}</Typography>
        <Typography as="span" styleProps={{ weight: "medium", color: 'secondary' }}>@{user.id}</Typography>
      </style.ChatUserInfo>
    </>
  )
}