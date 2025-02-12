'use client';
import * as style from '@/app/styles/pages/messages.css';
import { faker } from "@faker-js/faker";
import { PageHeader } from '@/app/styles/component/afterLayout.css';
import { BackButton } from '@/app/_component/Button';
import { Typography } from '@/app/_component/Text';
import { Message } from '@/model/Message';
import { useQuery } from '@tanstack/react-query';
import { getMessages } from '@/app/(afterLogin)/messages/[roomId]/_lib/getMessages';
import { useParams } from 'next/navigation';

export default function UserInfo() {
  const params = useParams();
  console.log("params:", params);
  const roomId = params.roomId as string;
  console.log("roomId:", roomId, typeof roomId);

  const { data: room, error } = useQuery<Message, Object, Message, [_1: string, _2: string]>({
    queryKey: ['rooms', roomId],
    queryFn: getMessages,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: !!roomId
  });

  return (
    <>
      <PageHeader>
        <BackButton />
        <Typography as="h4" styleProps={{ weight: "semiBold" }}>{room?.Receiver?.nickname}</Typography>
      </PageHeader>
      <style.ChatUserInfo href={`/${room?.Receiver?.id}`}>
        <img src={room?.Receiver?.image} alt="user profile" />
        <Typography as="strong" styleProps={{ weight: "semiBold" }}>{room?.Receiver?.nickname}</Typography>
        <Typography as="span" styleProps={{ weight: "medium", color: 'secondary' }}>@{room?.Receiver?.id}</Typography>
      </style.ChatUserInfo>
    </>
  )
}