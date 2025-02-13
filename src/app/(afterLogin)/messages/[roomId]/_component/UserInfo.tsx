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
  console.log("UserInfo messageId:", messageId);
  const { data:message, error } = useQuery<Message, Object, Message, [_1: string, _2: string]>({
    queryKey: ['message', messageId],
    queryFn: getMessages,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return (
    <>
      <PageHeader>
        <BackButton />
        <Typography as="h4" styleProps={{ weight: "semiBold" }}>{message?.Receiver?.nickname}</Typography>
      </PageHeader>
      <style.ChatUserInfo href={`/${message?.Receiver?.id}`}>
        <img src={message?.Receiver?.image} alt="user profile" />
        <Typography as="strong" styleProps={{ weight: "semiBold" }}>{message?.Receiver?.nickname}</Typography>
        <Typography as="span" styleProps={{ weight: "medium", color: 'secondary' }}>@{message?.Receiver?.id}</Typography>
      </style.ChatUserInfo>
    </>
  )
}