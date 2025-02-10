'use client';
import { H4 } from '@/app/_component/Text';
import * as style from '@/app/styles/component/afterLayout.css';
import { useContext } from 'react';
import { TabContext } from '@/app/(afterLogin)/home/_component/TabProvider';

export default function Tab(){
  const { tab, setTab } = useContext(TabContext);
  const onClickRec = () => {
    setTab('rec');
  };
  const onClickFol = () => {
    setTab('fol');
  };

  return (
    <style.TopFixed>
      <H4 styleProps={{size: "large", weight: "bold"}}>홈</H4>
      <style.TabWrap>
        <style.TabItem onClick={onClickRec}>
          추천
          <style.TabIndicator hidden={tab === 'fol'} />
        </style.TabItem>
        <style.TabItem onClick={onClickFol}>
          팔로우 중
          <style.TabIndicator hidden={tab === 'rec'} />
        </style.TabItem>
      </style.TabWrap>
    </style.TopFixed>
  )
}