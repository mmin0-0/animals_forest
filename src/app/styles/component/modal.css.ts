'use client';
import styled from 'styled-components';
import { size, border, spacing, blank, position, flexBox, radius } from '@/app/styles/utils';
import { media } from '@/app/styles/media';

export const ModalWrap = styled.div`
  ${size('100vw', '100vh')};
  ${position('fixed', {left: '0', top : '0'})};
  z-index: 100;
  background: ${({theme}) => theme.color.dimmed};
  &.tweet{
    > div > div{max-width: 80vw;}
  }
`;
export const ModalCont = styled.div`
  ${position('absolute', {top: '50%', left: '50%'})};
  ${size('calc(100% - 4rem)', undefined)};
  ${blank.pc(2)};
  max-width: 60rem;
  max-height: 90vh;
  overflow-y: auto;
  transform: translate(-50%, -50%);
  background: ${({theme}) => theme.color.white};
  &::-webkit-scrollbar {width: 10px;}
  &::-webkit-scrollbar-thumb {
    background: ${({theme}) => theme.color.mainColor};
    ${radius('10px')};
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-track {background: ${({theme}) => theme.color.white};}
`;
export const ModalHeader = styled.div`
  ${flexBox('row', 'space-between', 'center')};
`;
export const ModalBody = styled.div`
  ${spacing.mt(2)};
  .postImageZone{${spacing.mt(1.2)};}
`;
export const ModalFooter = styled.div`
  ${spacing.mt(2.4)};
  .btn-center {${spacing.ma}}
`;
export const ModalButtonSection = styled.div`${flexBox('row', 'space-between', 'center', '1rem')}`;
export const ModalButtons = styled.div``;
export const ModalMessage = styled.div`
  color: ${({theme}) => theme.color.red};
  font-weight: ${({theme}) => theme.fontWeight.semiBold};
  text-align: center;
  ${spacing.mt(1.4)};
`;
export const ModalError = styled.div`
  color: ${({theme}) => theme.color.red};
  font-weight: ${({theme}) => theme.fontWeight.bold};
  text-align: center;
  ${spacing.mb(1)};
`;

// signup
export const InputContainer = styled.div`
  > div:not(:first-child){${spacing.mt(1.4)}}
  input{
    ${size('100%')};
    ${border('1px', 'solid', ({ theme }) => theme.color.gray)};
    ${blank.py(1, 1)};
    ${blank.px(.8, .8)};
    &:focus{border-color: ${({theme}) => theme.color.mainColor}}
  }
`;

// photo modal
export const PhotoModalCont = styled.div`
  ${size('100vw', '100vh')};
  ${position('fixed', {top: '0', left: '0'})};
  z-index: 100;
  background: rgba(${({theme}) => theme.color.blackRgb}, .85);
  display: flex;
  gap: 1rem;
  > button{${position('absolute', {top: '1.6rem', left: '1.6rem'})}}
  ${media.sm`
    flex-direction: column;  
  `};
`;
export const PhotoImageZone = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  ${blank.pl(1)};
  > img{display: none;}
  ${media.sm`
    height: 50%;
    ${blank.pl(0)};
    ${blank.p(1, 1, 0, 1)};
  `};
`;
export const PhotoImage = styled.div`
  ${size(undefined, '100%')};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
`;
export const PhotoButtonZone = styled.div`
  > div{
    ${size('100%', '6rem')};
    max-width: 30rem;
    ${spacing.ma};
  }
`;
export const PhotoModalComment = styled.div`
  ${size('30%')};
  background: ${({theme}) => theme.color.white};
  ${border('1px', 'solid', ({theme}) => theme.color.gray01, 'left')};
  overflow: auto;
  &::-webkit-scrollbar {width: 10px;}
  &::-webkit-scrollbar-thumb {
    background: ${({theme}) => theme.color.mainColor};
    ${radius('10px')};
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-track {background: ${({theme}) => theme.color.white};}
  ${media.sm`
    ${size('100%', '50%')};  
  `};
`;

// compose/tweet
export const PostUserSection = styled.div`
  display: flex;
  gap: 1rem;
  ${border('1px', 'solid', ({theme}) => theme.color.gray01, 'bottom')};
  textarea {
    ${size('100%')};
    min-height: 6rem;
    border: none;
    outline: none;
    font-size: ${({theme}) => theme.fontSize.medium};
  }
`;
export const UserImg = styled.div`
  min-width: 4rem;
  ${size('4rem', '4rem')};
  ${radius('50%')};
  overflow: hidden;
  img{
    ${size('100%', '100%')};
    object-fit: cover;
  }
`;
export const UserInfo = styled.div`
  ${flexBox('row', 'flex-start', 'center', '.4rem')};
`;
export const Original = styled.div`
  ${spacing.mb(1)};
  > div{border-bottom: 0;}
`;
export const PostUserImg = styled.div`
  position: relative;
  &::after{
    content: '';
    ${size('3px', 'calc(100% - 4rem)')};
    background: ${({theme}) => theme.color.gray01};
    ${position('absolute', {left: '50%', bottom: '0'})};
    transform: translateX(-50%);
  }
  img{
    min-width: 4rem;
    ${size('4rem', '4rem')};
    ${radius('50%')};
    overflow: hidden;
  }
`;
export const OriginalPost = styled.div`${size('100%')}`;
export const PostContent = styled.div`
  ${blank.py(1.2, 2)};
  line-height: 1.2;
  + p > a {color: ${({theme}) => theme.color.mainColor};}
`;