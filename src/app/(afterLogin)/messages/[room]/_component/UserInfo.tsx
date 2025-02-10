'use client';
import * as style from '@/app/styles/pages/messages.css';
import { PageHeader } from '@/app/styles/component/afterLayout.css';
import { BackButton } from '@/app/_component/Button';
import { H4, Strong, Span } from '@/app/_component/Text';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/app/(afterLogin)/[username]/_lib/getUser';

type Props = {id: string};
export default function UserInfo({id}:Props) {
  const { data:user } = useQuery({
    queryKey: ['users', id],
    queryFn: getUser,
  });

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