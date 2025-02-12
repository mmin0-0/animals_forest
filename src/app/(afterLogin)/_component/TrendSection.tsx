'use client';
import Trend from '@/app/(afterLogin)/_component/Trend';
import { Typography } from '@/app/_component/Text';
import * as style from '@/app/styles/pages/rightSearchZone.css';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { getTrend } from '@/app/(afterLogin)/_lib/getTrends';
import { Hashtag } from '@/model/Hashtag';

export default function TrendSection(){
  const { data: session } = useSession();
  const { data } = useQuery<Hashtag[]>({
    queryKey: ['trends'], 
    queryFn: getTrend,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: !!session?.user
  });

  if(session?.user){
    return (
      <style.TrendWrap>
        <Typography as="h4" styleProps={{weight: 'semiBold'}}>나를 위한 트렌드</Typography>
        <style.TrendCont>
          {data?.map((trend) => <Trend key={trend.title} trend={trend} />)}
        </style.TrendCont>
      </style.TrendWrap>
    );
  }
  
  return (
    <style.TrendWrap>
      <style.NoTrend>
        <Typography styleProps={{weight: 'semiBold'}}>트렌드를 가져올 수 없습니다.</Typography>
      </style.NoTrend>
    </style.TrendWrap>
  )
}