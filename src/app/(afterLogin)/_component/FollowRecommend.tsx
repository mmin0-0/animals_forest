'use client';
import * as style from '@/app/styles/pages/rightSearchZone.css';
import { Typography } from '@/app/_component/Text';
import { Button } from '@/app/_component/Button';
import { User } from '@/model/User';
import { MouseEventHandler } from 'react';

type Props = {user: User};
export default function FollowRecommend({user}:Props){
  const onFollow: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <style.FollowItem href={`/${user.id}`}>
      <style.FollowUserInfo>
        <style.UserImg>
          <img src={user.image} alt={user.id} />
        </style.UserImg>
        <style.UserInfo>
          <Typography as="strong" styleProps={{weight: 'semiBold'}}>{user.nickname}</Typography>
          <Typography as="span" styleProps={{size: 'small', weight: 'medium', color: 'secondary'}}>@{user.id}</Typography>
        </style.UserInfo>
      </style.FollowUserInfo>
      <Button styleProps={{size: "small", variant: 'primary'}} onClick={onFollow}>팔로우</Button>
    </style.FollowItem>
  )
}