'use client';
import styled from 'styled-components';
import { media } from '@/app/styles/media';
import { flexBox, spacing, blank, size, border, radius, transition } from '@/app/styles/utils';

export const introContainer = styled.div`
  height: 100vh;
  ${flexBox('row', 'center', 'center')};
`;
export const introContInner = styled.div`
  max-width: 1200px;
  ${size('calc(100% - 4rme)', undefined)};
  ${flexBox('row', 'center', 'center', '4rem')};
  ${media.lg`
    max-width: 60rem;
    flex-direction: column;
    ${blank.py(0, 2)};
  `};
  > div:first-child{
    ${size('60%', undefined)};
    ${media.lg`width: 100%;`};
  }
  > div:last-child{
    ${size('40%', undefined)};
    ${media.lg`width: 100%;`};
  }
  > div{
    text-align: center;
    &.introImg{
      img{
        ${size('60vw', 'auto')};
        ${spacing.ma};
        max-width: 38rem;
        display: block;
      }
    }
    p{${spacing.mt(2)};}
  }
`;
export const introBtnWrap = styled.div`
  ${spacing.mt(3.6)};
  > a{
    ${spacing.mt(1)};
    ${blank.px(1.2, 1.2)};
    ${size('100%', '4rem')};
    ${flexBox('row', 'center', 'center')};
    ${border('1px', 'solid',({ theme }) => theme.color.mainColor)};
    background: ${({theme}) => theme.color.white};
    color: ${({theme}) => theme.color.mainColor};
    ${radius('2rem')};
    ${transition('all')};
    &:hover{
      background: ${({theme}) => theme.color.mainColor};
      color: ${({theme}) => theme.color.white};
    }
  }
`;