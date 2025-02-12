'use client';
import * as style from '@/app/styles/pages/rightSearchZone.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SearchForm from '@/app/(afterLogin)/_component/SearchForm';
import TrendSection from '@/app/(afterLogin)/_component/TrendSection';
import FollowRecommendSection from '@/app/(afterLogin)/_component/FollowRecommendSection';
import { Typography } from '@/app/_component/Text';
import { RadioInput } from '@/app/_component/Input';

export default function RightSearchZone() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const onChangeFollow = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('pf', 'on');
    router.replace(`/search?${newSearchParams.toString()}`);
  };
  const onChangeAll = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('pf');
    router.replace(`/search?${newSearchParams.toString()}`);
  };

  if (pathname === '/search') {
    return (
      <style.Wrap>
        <style.Filter>
          <Typography as="h4" styleProps={{weight: 'semiBold'}}>검색필터</Typography>
          <style.FilterCont>
            <RadioInput text="모든 사용자" name="pf" id="user" onChange={onChangeAll} defaultChecked />
            <RadioInput text="내가 팔로우하는 사람들" name="pf" id="followUser" onChange={onChangeFollow} value="on" />
          </style.FilterCont>
        </style.Filter>
      </style.Wrap>
    )
  }

  if (pathname === '/explore') {
    console.log('탐색하기')
    return (
      <style.Wrap>
        <FollowRecommendSection />
      </style.Wrap>
    )
  }

  return (
    <style.Wrap className="default">
      <style.FixedSearch>
        <SearchForm />
      </style.FixedSearch>
      <TrendSection />
      <FollowRecommendSection />
    </style.Wrap>
  )
}