'use client';
import styled from 'styled-components';
import { flexBox, spacing, blank, size, border, radius, transition, ellipsis, position } from '@/app/styles/utils';

export const MessagesMain = styled.div``;
export const MessagesCont = styled.div``;

// 채팅목록(room)
export const RoomWrap = styled.div`
  ${flexBox('row', 'flex-start', 'center', '1rem')};
  ${blank.pc(1.4)};
  ${border('1px', 'solid', ({theme}) => theme.color.gray01, 'bottom')};
  cursor: pointer;
  ${transition('background')};
  &:hover{background: ${({theme}) => theme.color.gray01};}
`;
export const UserImg = styled.div`
  min-width: 4rem;
  ${size('4rem', '4rem')};
  ${radius('50%')};
  overflow: hidden;
  > img {
    ${size('100%', '100%')};
    object-fit: cover;
  }
`;
export const RoomChatInfo = styled.div``;
export const RoomUserInfo = styled.div``;
export const RoomLastChat = styled.div`
  ${spacing.mt(.6)};
  ${ellipsis(2)};
  line-height: 1.2;
`;

// 채팅 상세페이지
export const RoomMain = styled.div`
  min-height: 100dvh;
  max-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
`;
export const ChatInfo = styled.div`
  ${border('1px', 'solid', ({theme}) => theme.color.gray01, 'top')};
  flex: 1;
  overflow-y: auto;
  &::-webkit-scrollbar {width: 10px;}
  &::-webkit-scrollbar-thumb {
    background: ${({theme}) => theme.color.mainColor};
    ${radius('10px')};
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-track {background: ${({theme}) => theme.color.white};}
`;
export const ChatUserInfo = styled.a`
  ${flexBox('column', 'center', 'center')};
  ${border('1px', 'solid', ({theme}) => theme.color.gray01, 'top')};
  ${blank.pc(2)};
  ${transition('background')};
  &:hover{background: ${({theme}) => theme.color.gray02}}
  > img{
    ${size('6.4rem', '6.4rem')};
    ${radius('50%')};
    overflow: hidden;
  }
  > strong{${spacing.mt(1)};}
`;
export const ChatContent = styled.div`${blank.pc(1.4)};`;
export const Message = styled.div`
  display: flex;
  flex-direction: column;
  ${blank.pb(2.4)};
  > p{${spacing.mt(.8)};}
  &.myMessage{
    align-items: flex-end;
    > div{
      background: ${({theme}) => theme.color.mainColor};
      border-bottom-left-radius: 2rem;
      color: ${({theme}) => theme.color.white};
    }
  }
  &.yourMessage{
    align-items: flex-start;
    > div{
      background: #eff3f4;
      border-bottom-right-radius: 2rem;
    }
  }
`;
export const MessageContent = styled.div`
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  line-height: 1.2;
  ${blank.px(1.6, 1.6)};
  ${blank.py(1.2, 1.2)};
`;

export const FormZone = styled.div`
  ${size('100%')};
  ${blank.py(1.4, 1.4)};
  ${border('1px', 'solid', ({theme}) => theme.color.gray02, 'top')};
  background: ${({theme}) => theme.color.white};
  form{
    position: relative;
    ${size('calc(100% - 2.8rem)')};
    ${spacing.ma};
  }
  textarea{
    background: ${({theme}) => theme.color.gray02};
    border-color: ${({theme}) => theme.color.gray02};
    ${radius('2rem')};
    ${size('100%')};
    ${blank.p(1, 4, 1, 2)};
    &:focus{border-color: ${({theme}) => theme.color.mainColor}}
  }
  button{
    ${position('absolute', {top: '50%', right: '1rem'})};
    transform: translateY(-50%);
    &:disabled{
      opacity: .4;
      cursor: no-drop;
    }
  }
`;