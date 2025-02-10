'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import * as style from '@/app/styles/component/afterLayout.css';

export default function Tab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [current, setCurrent] = useState('hot');
  const onClickHot = () => {
    setCurrent('hot');
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('f');
    router.replace(`/search?${newSearchParams.toString()}`);
  };
  const onClickNew = () => {
    setCurrent('new');
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('f', 'live');
    router.replace(`/search?${newSearchParams.toString()}`);
  };

  return (
    <style.TabWrap>
      <style.TabItem onClick={onClickHot}>
        인기
        <style.TabIndicator hidden={current === 'new'} />
      </style.TabItem>
      <style.TabItem onClick={onClickNew}>
        팔로우 중
        <style.TabIndicator hidden={current === 'hot'} />
      </style.TabItem>
    </style.TabWrap>
  )
}