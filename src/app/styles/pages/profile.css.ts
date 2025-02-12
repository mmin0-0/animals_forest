'use client';
import styled from 'styled-components';
import { flexBox, spacing, blank, size, border, radius, transition } from '@/app/styles/utils';

export const ProfileMain = styled.div``;
// userInfo
export const UserInfo = styled.div``;
export const InfoBody = styled.div``;
export const UserZone = styled.div`
  ${blank.px(1.6, 1.6)};
  ${blank.py(1.2, 1.2)};
  ${flexBox('row', 'space-between', 'center')};
`;
export const InfoWrap = styled.div`${flexBox('row', 'flex-start', 'center', '2rem')};`;
export const InfoWrapBtns = styled.div`
  ${flexBox('row', 'flex-start', 'center', '1rem')};
  .messageBtn{
    min-width: 4rem;
    ${size('4rem', '4rem')};
    ${radius('50%')};
    ${border('1px', 'solid', ({theme}) => theme.color.mainColor)};
    ${transition('background')};
    &:hover{background: rgba(${({theme}) => theme.color.mainRgb}, .1)}
  }
`;
export const UserImg = styled.div`
  min-width: 13.4rem;
  ${size('13.4rem', '13.4rem')};
  ${radius('50%')};
  overflow: hidden;
  background: ${({theme}) => theme.color.gray01};
  ${border('1px', 'solid', ({theme}) => theme.color.gray01)};
  img{
    ${size('100%', '100%')};
    object-fit: cover;
  }
`;
export const UserName = styled.div`
  p{${spacing.mt(.6)};}
`;
export const FollowInfo = styled.div`
  ${flexBox('row', 'flex-start', 'center', '1rem')};
  ${blank.px(1.6, 1.6)};
  ${blank.py(1, 1)};
  p{
    white-space: nowrap;
    cursor: pointer;
    &:hover{text-decoration: underline;}
  }
`;
export const UserEmptyZone = styled.div`
  ${blank.px(1.6, 1.6)};
  ${blank.py(1.2, 1.2)};
  ${flexBox('row', 'space-between', 'center')};
`;
export const EmptyTxt = styled.div`
  min-height: 10rem;
  ${border('1px', 'solid', ({theme}) => theme.color.gray01, 'top')};
  ${flexBox('row', 'center', 'center')};
`;