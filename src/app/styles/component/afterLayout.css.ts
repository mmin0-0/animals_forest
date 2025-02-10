'use client';
import styled from 'styled-components';
import { media } from '@/app/styles/media';
import { blank, size, spacing, radius, position, border, flexBox } from '@/app/styles/utils';

export const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  ${size('100%')};
  max-width: 1250px;
  ${spacing.ma};
`;
export const ContainerWrap = styled.div`
  ${flexBox('column', 'flex-start', 'flex-start')};
  ${size(undefined, '100vh')};
  flex-grow: 1;
`;
export const WrapInner = styled.div`
  ${size('100%', '100%')};
  ${flexBox('row', 'space-between', 'flex-start', '2rem')};
`;
export const Container = styled.div`
  flex: 1;
  min-height: 100dvh;
  // size(undefined, '200dvh')
  ${border('1px', 'solid', ({theme}) => theme.color.gray01)};
`;
export const FixMenu = styled.div`
  ${size('34rem', '100%')};
  ${spacing.mr(2)};
  display: inline-block;
  ${media.sm`
    display: none;
    ${spacing.mr(0)};
  `};
`;

// page header(고정) / Tab
export const TopFixed = styled.div`
  ${size('100%')};
  ${position('sticky', {top: '0'})};
  z-index: 1;
  background: rgba(${({theme}) => theme.color.whiteRgb}, .75);
  backdrop-filter: blur(12px);
  ${border('1px', 'solid', ({theme}) => theme.color.gray01, 'bottom')};
  > h4{
    ${blank.pc(2)};
  }
`;
export const TabWrap = styled.div`
  display: flex;
  background: transparent;
`;
export const TabItem = styled.div`
  flex: 1;
  ${size(undefined, '5.4rem')};
  cursor: pointer;
  position: relative;
  font-weight: ${({theme}) => theme.fontWeight.semiBold};
  ${flexBox('row', 'center', 'center')};
`;
export const TabIndicator = styled.div`
  ${size('5.6rem', '4px')};
  align-self: center;
  background: ${({theme}) => theme.color.mainColor};
  ${position('absolute', {bottom: '0'})};
`;

export const PageHeader = styled.div`
  ${flexBox('row', 'flex-start', 'center', '1rem')};
  ${blank.pc(1.4)};
`;

export const PostImageZone = styled.div`
  ${flexBox('row', 'flex-start', 'flex-start', '1rem')};
  flex-wrap: wrap;
`;
export const PostImageBox = styled.div`
  ${border('1px', 'solid', ({theme}) => theme.color.gray01)};
  ${blank.pc(1)};
  ${radius('1.2rem')};
  min-width: 18rem;
  max-width: 18rem;
  > button {
    ${size('2rem', '2rem')};
    display: block;
    ${spacing.ml('auto')};
    ${spacing.mr('0')};
  }
  > img {
    ${size('100%')};
    max-height: 18rem;
    object-fit: contain;
  }
`;