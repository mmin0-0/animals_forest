'use client';
import * as style from '@/app/styles/pages/rightSearchZone.css';
import { Strong, Span } from '@/app/_component/Text';
import { Button } from '@/app/_component/Button';
import { User } from '@/model/User';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { MouseEventHandler } from 'react';

type Props = {user: User};
export default function FollowRecommend({user}:Props){
  const { data: session } = useSession();
  const followed = !!user.Followers?.find((v) => v.id === session?.user?.email);
  const queryClient = useQueryClient();

  const follow = useMutation({
    mutationFn: (userId: string) => {
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`, {
        credentials: 'include',
        method: 'post',
      })
    },
    onMutate(userId: string) {
      const value: User[] | undefined = queryClient.getQueryData(["users", "followRecommends"]);
      if (value) {
        const index = value.findIndex((v) => v.id === userId);
        const shallow = [...value];
        shallow[index] = {
          ...shallow[index],
          Followers: [{ id: session?.user?.email as string }],
          _count: {
            ...shallow[index]._count,
            Followers: shallow[index]._count?.Followers + 1,
          }
        }
        queryClient.setQueryData(["users", "followRecommends"], shallow)
      }
      const value2: User | undefined = queryClient.getQueryData(["users", userId]);
      if (value2) {
        const shallow = {
          ...value2,
          Followers: [{ id: session?.user?.email as string }],
          _count: {
            ...value2._count,
            Followers: value2._count?.Followers + 1,
          }
        }
        queryClient.setQueryData(["users", userId], shallow)
      }
    },
    onError(error, userId: string) {
      const value: User[] | undefined = queryClient.getQueryData(["users", "followRecommends"]);
      if (value) {
        const index = value.findIndex((v) => v.id === userId);
        const shallow = [...value];
        shallow[index] = {
          ...shallow[index],
          Followers: shallow[index].Followers.filter((v) => v.id !== session?.user?.email),
          _count: {
            ...shallow[index]._count,
            Followers: shallow[index]._count?.Followers - 1,
          }
        }
        queryClient.setQueryData(["users", "followRecommends"], shallow);
        const value2: User | undefined = queryClient.getQueryData(["users", userId]);
        if (value2) {
          const shallow = {
            ...value2,
            Followers: value2.Followers.filter((v) => v.id !== session?.user?.email),
            _count: {
              ...value2._count,
              Followers: value2._count?.Followers - 1,
            }
          }
          queryClient.setQueryData(["users", userId], shallow)
        }
      }
    },
  });

  const unfollow = useMutation({
    mutationFn: (userId: string) => {
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`, {
        credentials: 'include',
        method: 'delete',
      })
    },
    onMutate(userId: string) {
      const value: User[] | undefined = queryClient.getQueryData(["users", "followRecommends"]);
      if (value) {
        const index = value.findIndex((v) => v.id === userId);
        const shallow = [...value];
        shallow[index] = {
          ...shallow[index],
          Followers: shallow[index].Followers.filter((v) => v.id !== session?.user?.email),
          _count: {
            ...shallow[index]._count,
            Followers: shallow[index]._count?.Followers - 1,
          }
        }
        queryClient.setQueryData(["users", "followRecommends"], shallow);
        const value2: User | undefined = queryClient.getQueryData(["users", userId]);
        if (value2) {
          const shallow = {
            ...value2,
            Followers: value2.Followers.filter((v) => v.id !== session?.user?.email),
            _count: {
              ...value2._count,
              Followers: value2._count?.Followers - 1,
            }
          }
          queryClient.setQueryData(["users", userId], shallow)
        }
      }
    },
    onError(error, userId: string) {
      const value: User[] | undefined = queryClient.getQueryData(["users", "followRecommends"]);
      if (value) {
        const index = value.findIndex((v) => v.id === userId);
        const shallow = [...value];
        shallow[index] = {
          ...shallow[index],
          Followers: [{ id: session?.user?.email as string }],
          _count: {
            ...shallow[index]._count,
            Followers: shallow[index]._count?.Followers + 1,
          }
        }
        queryClient.setQueryData(["users", "followRecommends"], shallow)
      }
      const value2: User | undefined = queryClient.getQueryData(["users", userId]);
      if (value2) {
        const shallow = {
          ...value2,
          Followers: [{ id: session?.user?.email as string }],
          _count: {
            ...value2._count,
            Followers: value2._count?.Followers + 1,
          }
        }
        queryClient.setQueryData(["users", userId], shallow)
      }
    },
  });

  const onFollow: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (followed) {
      unfollow.mutate(user.id);
    } else {
      follow.mutate(user.id);
    }
  };

  return (
    <style.FollowItem href={`/${user.id}`}>
      <style.FollowUserInfo>
        <style.UserImg>
          <img src={user.image} alt={user.id} />
        </style.UserImg>
        <style.UserInfo>
          <Strong styleProps={{weight: "semiBold"}}>{user.nickname}</Strong>
          <Span styleProps={{weight: "medium"}}>@{user.id}</Span>
        </style.UserInfo>
      </style.FollowUserInfo>
      <Button styleProps={{size: "small", variant: followed ? 'secondary' : 'primary'}} onClick={onFollow}>{followed ? '팔로잉' : '팔로우'}</Button>
    </style.FollowItem>
  )
}