'use client';
import styled from 'styled-components';
import { media } from '@/app/styles/media';
import { blank, flexBox, size, spacing, radius, transition, position } from '@/app/styles/utils';

export const Header = styled.header`
  display: flex;
  flex-direction: column;
`;
export const HeaderInner = styled.div`
  ${blank.py(2, 2)};
  ${size('24rem', '100vh')};
  min-width: 24rem;
  ${transition('all')};
  ${media.sm`
    ${size('6.8rem')};
    min-width: 6.8rem;
  `}
`;
export const HeaderFixed = styled.div`
  ${position('fixed')};
  ${size('inherit', '100dvh')};
  ${flexBox('column', 'flex-start', 'center')};
`;
export const Logo = styled.a`
  ${size('100%')};
  > img{
    max-width: 60%;
    ${size('100%')};
    ${spacing.ma};
    display: block;
    ${media.sm`max-width: 80%`}
  }
`;
export const MenuWrap = styled.div`
  ${spacing.mt(3.6)};
  ${size('100%')};
  nav li:not(:first-child){${spacing.mt(1)};}
`;
export const PostWrap = styled.a`
  ${spacing.mt(1)};
  ${blank.px(2, 2)};
  ${blank.py(1, 1)};
  ${flexBox('row', 'flex-start', 'center', '.6rem')};
  ${media.sm`justify-content: center;`}
  span{
    ${size('3rem')};
    ${flexBox('row', 'center', 'center')};
    svg{${size('3rem')}}
  }
  strong{${media.sm`display: none;`}}
  &:hover{
    strong{
      color: ${({theme}) => theme.color.mainColor};
      font-weight: ${({theme}) => theme.fontWeight.medium};
    }
  }
`;
export const NavItem = styled.li`
  > a{
    ${blank.px(2, 2)};
    ${blank.py(1,1)};
    ${flexBox('row', 'flex-start', 'center', '.6rem')};
    ${transition('background', '.15s')};
    &:hover{
      background: rgba(${({theme}) => theme.color.mainRgb}, .15);
    }
    ${media.sm`justify-content: center;`}
  }
  span{
    ${flexBox('row', 'center', 'center')};
    svg{${size('3rem')}}
  }
  strong{${media.sm`display: none;`}}
`;
export const LogoutButton = styled.button`
  ${size('100%')};
  ${spacing.mt(3.6)};
  ${blank.px(1,1)};
  ${flexBox('row', 'flex-start', 'center', '.6rem')};
  border: 0;
  background: transparent;
  ${media.sm`justify-content: center;`}
  span{color: ${({theme}) => theme.color.gray};}
  > strong{
    white-space: nowrap;
    ${media.sm`display: none;`}
  }
`;

export const UserImg = styled.div`
  ${size('4rem', '4rem')};
  ${radius('50%')};
  overflow: hidden;
  position: relative;
  img{
    ${size('100%', '100%')};
    object-fit: cover;
  }
`;