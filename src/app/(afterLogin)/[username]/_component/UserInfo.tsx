'use client';
import { ActionButton, BackButton, Button } from '@/app/_component/Button';
import { Typography } from '@/app/_component/Text';
import * as style from '@/app/styles/pages/profile.css';
import { PageHeader } from '@/app/styles/component/afterLayout.css';
import { getUser } from '@/app/(afterLogin)/[username]/_lib/getUser';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/model/User';
import { MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';

type Props = { username: string };
export default function UserInfo({ username }: Props) {
  const router = useRouter();
  const { data: user, error } = useQuery<User, Object, User, [_1: string, _2: string]>({
    queryKey: ['users', username],
    queryFn: getUser,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if (error) {
    return (
      <style.UserInfo>
        <PageHeader>
          <BackButton />
          <Typography as="h4" styleProps={{ size: 'medium', weight: 'semiBold'}}>프로필</Typography>
        </PageHeader>
        <style.InfoBody>
          <style.UserEmptyZone>
            <style.InfoWrap>
              <style.UserImg></style.UserImg>
              <style.UserName>
                <Typography as="strong" styleProps={{ size: 'large', weight: 'bold'}}>{`@test`}</Typography>
              </style.UserName>
            </style.InfoWrap>
          </style.UserEmptyZone>
        </style.InfoBody>
        <style.EmptyTxt>
          <Typography styleProps={{ size: 'medium', weight: 'bold'}}>계정이 존재하지 않음</Typography>
        </style.EmptyTxt>
      </style.UserInfo>
    )
  }

  if (!user) {
    return null
  }

  const onFollow: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const onMessage = () => {
    // router.push(`/messages/${ids.join('-')}`);
  };

  return (
    <style.UserInfo>
      <PageHeader>
        <BackButton />
        <Typography as="h4" styleProps={{ size: 'medium', weight: 'semiBold'}}>프로필</Typography>
      </PageHeader>
      <style.InfoBody>
        <style.UserZone>
          <style.InfoWrap>
            <style.UserImg>
              <img src={user.image} alt={user.id} />
            </style.UserImg>
            <style.UserName>
              <Typography as="strong" styleProps={{ size: 'large', weight: 'bold' }}>{user.nickname}</Typography>
              <Typography styleProps={{ weight: 'semiBold', color: 'secondary' }}>{`@${user.id}`}</Typography>
            </style.UserName>
          </style.InfoWrap>
          {
            user.id !== 'test' && <style.InfoWrapBtns>
            <ActionButton className="messageBtn" onClick={onMessage}>
              <svg viewBox="0 0 24 24" aria-hidden="true" width={24}><g><path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path></g></svg>
            </ActionButton>
            <Button styleProps={{ size: "small", variant: 'primary' }} onClick={onFollow}>팔로우</Button>
          </style.InfoWrapBtns>
          }
        </style.UserZone>
      </style.InfoBody>
      <style.FollowInfo>
        <Typography styleProps={{ weight: 'semiBold', color: 'secondary' }}>{user._count.Followers} 팔로워</Typography>
        <Typography styleProps={{ weight: 'semiBold', color: 'secondary' }}>{user._count.Followings} 팔로우 중</Typography>
      </style.FollowInfo>
    </style.UserInfo>
  )
}