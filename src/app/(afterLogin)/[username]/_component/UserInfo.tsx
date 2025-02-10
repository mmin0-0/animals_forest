'use client';
import { ActionButton, BackButton, Button } from '@/app/_component/Button';
import { H4, Strong, P } from '@/app/_component/Text';
import * as style from '@/app/styles/pages/profile.css';
import { PageHeader } from '@/app/styles/component/afterLayout.css';
import { getUser } from '@/app/(afterLogin)/[username]/_lib/getUser';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { User } from '@/model/User';
import { Session } from 'next-auth';
import { MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  username: string,
  session: Session | null,
};
export default function UserInfo({ username, session }: Props) {
  const router = useRouter();
  const { data: user, error } = useQuery<User, Object, User, [_1: string, _2: string]>({
    queryKey: ['users', username],
    queryFn: getUser,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
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
        if (index > -1) {
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
        if (index > -1) {
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
        }
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
        if (index > -1) {
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
        }
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
        if (index > -1) {
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

  if (error) {
    return (
      <style.UserInfo>
        <PageHeader>
          <BackButton />
          <H4 styleProps={{ size: 'medium', weight: 'semiBold' }}>프로필</H4>
        </PageHeader>
        <style.InfoBody>
          <style.UserEmptyZone>
            <style.InfoWrap>
              <style.UserImg></style.UserImg>
              <style.UserName>
                <Strong styleProps={{ size: 'large', weight: 'bold' }}>{`@test`}</Strong>
              </style.UserName>
            </style.InfoWrap>
          </style.UserEmptyZone>
        </style.InfoBody>
        <style.EmptyTxt>
          <Strong styleProps={{ size: 'medium', weight: 'bold' }}>계정이 존재하지 않음</Strong>
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
    if (followed) {
      unfollow.mutate(user.id);
    } else {
      follow.mutate(user.id);
    }
  };

  const followed = user.Followers?.find((v) => v.id === session?.user?.email);

  const onMessage = () => {
    const ids = [session?.user?.email, user.id];
    ids.sort();
    router.push(`/messages/${ids.join('-')}`);
  };

  return (
    <style.UserInfo>
      <PageHeader>
        <BackButton />
        <H4 styleProps={{ size: 'medium', weight: 'semiBold' }}>프로필</H4>
      </PageHeader>
      <style.InfoBody>
        <style.UserZone>
          <style.InfoWrap>
            <style.UserImg>
              <img src={user.image} alt={user.id} />
            </style.UserImg>
            <style.UserName>
              <Strong styleProps={{ size: 'large', weight: 'bold' }}>{user.nickname}</Strong>
              <P styleProps={{ weight: 'semiBold' }}>{`@${user.id}`}</P>
            </style.UserName>
          </style.InfoWrap>
          {
            user.id !== session?.user?.email && <style.InfoWrapBtns>
              <ActionButton className="messageBtn" onClick={onMessage}>
                <svg viewBox="0 0 24 24" aria-hidden="true" width={24}><g><path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path></g></svg>
              </ActionButton>
              <Button styleProps={{ size: "small", variant: followed ? 'secondary' : 'primary' }} onClick={onFollow}>{followed ? '팔로잉' : '팔로우'}</Button>
            </style.InfoWrapBtns>
          }
        </style.UserZone>
      </style.InfoBody>
      <style.FollowInfo>
        <P><Strong styleProps={{ weight: 'semiBold' }}>{user._count.Followers} 팔로워</Strong></P>
        <P><Strong styleProps={{ weight: 'semiBold' }}>{user._count.Followings} 팔로우 중</Strong></P>
      </style.FollowInfo>
    </style.UserInfo>
  )
}