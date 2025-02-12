'use client';
import { Typography } from '@/app/_component/Text';
import * as style from '@/app/styles/pages/rightSearchZone.css';
import FollowRecommend from '@/app/(afterLogin)/_component/FollowRecommend';
import { useQuery } from '@tanstack/react-query';
import { getFollowRecommends } from '@/app/(afterLogin)/_lib/getFollowRecommends';
import { User } from '@/model/User';

export default function FollowRecommendSection(){
  const { data } = useQuery<User[]>({
    queryKey: ['users', 'followRecommends'], 
    queryFn: getFollowRecommends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  
  return (
    <style.FollowWrap>
      <Typography as="h4" styleProps={{weight: 'semiBold'}}>팔로우 추천</Typography>
      <style.FollowCont>
        {data?.map((user) => <FollowRecommend key={user.id} user={user} />)}
      </style.FollowCont>
    </style.FollowWrap>
  )
}