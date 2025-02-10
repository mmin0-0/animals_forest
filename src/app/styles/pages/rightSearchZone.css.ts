'use client';
import styled from 'styled-components';
import { border, position, size, spacing, radius, blank, flexBox, transition } from '@/app/styles/utils';

export const Wrap = styled.div`
  ${blank.py(2, 2)};
  ${size('inherit')};
  &.default{
    ${blank.py(6, 2)};
    > div{top: 1.6rem}
  }
  > div:not(:first-child){${spacing.mt(1)}}
`;

export const UserImg = styled.div`
  ${size('4rem', '4rem')};
  ${radius('50%')};
  overflow: hidden;
  img{
    ${size('100%', '100%')};
    object-fit: cover;
  }
`;
export const UserInfo = styled.div`
  span{
    display: block;
    font-size: ${({theme}) => theme.fontSize.small};
  }
`;

// 상단 검색바(고정)
export const FixedSearch = styled.div`
  ${size('inherit')};
  ${position('fixed')};
  z-index: 1;
`;

// 트렌드 리스트(해시태그)
export const TrendWrap = styled.div`
  ${border('1px', 'solid', ({theme}) => theme.color.gray01)};
  ${radius('2rem')};
  overflow: hidden;
  > h4{
    ${blank.px(1.4, 1.4)};
    ${blank.pt(1.4)};
  }
`;
export const TrendCont = styled.div`${spacing.mt(1)}`;
export const NoTrend = styled.div`
  text-align: center;
  ${blank.pc(1.2)};
`;
export const TrendItem = styled.a`
  display: block;
  ${blank.px(1.4, 1.4)};
  ${blank.py(1.2, 1.2)};
  ${transition('background')};
  &:not(:last-child){
    ${border('1px', 'solid', ({theme}) => theme.color.gray01, 'bottom')};
  }
  &:hover{background: ${({theme}) => theme.color.gray02}}
  strong{
    display: block;
    ${blank.py(1, .6)};
  }
`;

// 팔로우 리스트
export const FollowWrap = styled.div`
  ${border('1px', 'solid', ({theme}) => theme.color.gray01)};
  ${radius('2rem')};
  ${blank.pc(1.4)};
`;
export const FollowCont = styled.div`
  ${spacing.mt(2)};
  > a:not(:last-child){${spacing.mb(1.2)}}
`;
export const FollowItem = styled.a`
  ${flexBox('row', 'space-between', 'center', '.4rem')};
  > button{
    ${blank.py(.6, .6)};
    ${blank.px(1.2, 1.2)};
    max-width: fit-content;
    font-size: ${({theme}) => theme.fontSize.small};
    font-weight: ${({theme}) => theme.fontWeight.medium};
  }
`;
export const FollowUserInfo = styled.div`
  ${flexBox('row', 'flex-start', 'center', '.6rem')};
  span{color: ${({theme}) => theme.color.gray};}
`;

// 검색필터(search 페이지만 적용)
export const Filter = styled.div`
  ${border('1px', 'solid', ({theme}) => theme.color.gray01)};
  ${radius('2rem')};
  ${blank.pc(1.4)};
`;
export const FilterCont = styled.div`
  ${spacing.mt(2)};
  > div:not(:first-child){${spacing.mt(.6)};}
`;