'use client';
import styled from 'styled-components';
import { blank, size, spacing, radius, flexBox, border, position, transition } from '@/app/styles/utils';
import { media } from '@/app/styles/media';

// post
export const Post = styled.div`
  cursor: pointer;
  ${transition('background')};
  ${border('1px', 'solid', ({theme}) => theme.color.gray01, 'bottom')};
  ${blank.px(1.6, 1.6)};
  ${blank.py(1.2, 1.2)};
  &:hover{background: ${({theme}) => theme.color.gray02};}
  ${media.sm`
    ${blank.pc(1)};
  `}
`;
export const PostWrapper = styled.div`
  ${flexBox('row', 'flex-start', 'flex-start', '1.2rem')};
`;
export const PostUserSection = styled.div``;
export const PostBody = styled.div`
  ${size('100%')};
  display: flex;
  flex-direction: column;
`;
export const PostMeta = styled.div`
  ${flexBox('row', 'flex-start', 'center', '1rem')};
  > span{white-space: nowrap;}
`;
export const postUserName = styled.a`
  flex-wrap: wrap;
  ${flexBox('row', 'flex-start', 'center', '.4rem')};
  p, span{white-space: nowrap;}
  > span:hover{text-decoration: underline;}
`;
export const PostContent = styled.div`
  ${spacing.my(1,1)};
  line-height: 1.2;
  word-break: keep-all;
`;
export const PostComment = styled.div`
  ${spacing.mt(1)};
  a{
    color: ${({theme}) => theme.color.mainColor};
    font-size: ${({theme}) => theme.fontSize.small};
    &:hover{text-decoration: underline;}
  }
`;

export const PostReposted = styled.div`
  ${flexBox('row', 'flex-start', 'center')};
  color: ${({theme}) => theme.color.gray};
  font-size: ${({theme}) => theme.fontSize.small};
  line-height: 1.2;
  ${spacing.mb(1)};
  svg{fill: rgb(${({theme}) => theme.color.grayRgb})}
`;

//post images
export const PostImageSection = styled.div`
  ${size('100%')};
  display: inline-block;
  ${radius('2rem')};
  overflow: hidden;
  img{width: 100%;}

  // 다중이미지 (1개)
  &.oneImage{
    a{
      display: block;
      background: no-repeat;
      img{
        max-height: 50rem;
        min-height: 18rem;
      }
    }
  }
  // 다중이미지 (2,3개)
  &.twoImage, &.threeImage{
    height: 28rem;
    display: flex;
    gap: .2rem;
    > a, > div, > div > a{flex: 1;}
    > div{
      gap: .2rem;
      display: flex;
      flex-direction: column;
    }
  }
  &.fourImage{
    height: 28rem;
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    gap: .2rem;
  }
`;

//post action buttons
export const ActionButtons = styled.div`
  ${flexBox('row', 'space-between', 'center', '.4rem')};
  ${spacing.mt(1)};
`;
export const ButtonWrap = styled.div`
  ${blank.px(.6, .6)};
  ${blank.py(.2, .2)};
  ${radius('.6rem')};
  ${flexBox('row', 'center', 'center')};
  ${transition('background')};
  cursor: pointer;
  &.commentBtn{
    &:hover, &.commented{background: rgba(${({theme}) => theme.color.mainRgb}, .1)}
    &:hover svg, &.commented svg{fill: rgb(${({theme}) => theme.color.mainRgb})}
    &:hover > div, &.commented > div{color: rgb(${({theme}) => theme.color.mainRgb})}
  }

  &.repostBtn{
    &:hover, &.reposted{background: rgba(${({theme}) => theme.color.blueRgb}, .1)}
    &:hover svg, &.reposted svg{fill: rgb(${({theme}) => theme.color.blueRgb})}
    &:hover > div, &.reposted > div{color: rgb(${({theme}) => theme.color.blueRgb})}
  }

  &.heartBtn{
    &:hover, &.liked{background: rgba(${({theme}) => theme.color.redRgb}, .1)}
    &:hover svg, &.liked svg{fill: rgb(${({theme}) => theme.color.redRgb})}
    &:hover > div, &.liked > div{color: rgb(${({theme}) => theme.color.redRgb})}
  }

  &.white{
    svg, > div{
      fill: ${({theme}) => theme.color.white};
      color: ${({theme}) => theme.color.white};
    }
  }

  > button {
    ${size('3rem', '3rem')};
    ${radius('1rem')};
    ${flexBox('row', 'center', 'center')};
    ${transition('background')};
  }
`;
export const Count = styled.div`color: ${({theme}) => theme.color.gray};`;

// home - postForm && commentForm
export const PostForm = styled.div`${border('1px', 'solid', ({theme}) => theme.color.gray01, 'bottom')};`;
export const PostFormInner = styled.div`
  ${flexBox('row', 'flex-start', 'flex-start', '1.2rem')};
  ${blank.pc(1.6)};
  ${media.sm`${blank.pc(1)};`};
  textarea {
    ${size('100%')};
    ${blank.pc(1)};
    font-size: ${({theme}) => theme.fontSize.medium};
    line-height: 1.2;
    outline: none;
    border: none;
  }
`;
export const UserInfo = styled.div``;
export const UserImg = styled.div`
  position: relative;
  display: block;
  ${size('4rem', '4rem')};
  ${radius('50%')};
  overflow: hidden;
  img{
    ${size('100%', '100%')};
    object-fit: cover;
  }
`;
export const PostUserImgShade = styled.div`
  display: inline-block;
  ${size('100%', '100%')};
  ${radius('2rem')};
  ${position('absolute', {top: '0', left: '0'})};
  &:hover{background: rgba(${({theme}) => theme.color.blackRgb}, 0.15);}
`;
export const PostInputSection = styled.div`flex: 1;`;
export const PostButtonSection = styled.div`
  width: 100%;
  ${spacing.mt(1)};
  ${flexBox('row', 'space-between', 'center')};
  .uploadButton{
    ${flexBox('row', 'center', 'center')};
    svg{fill: rgb(${({theme}) => theme.color.mainRgb});}
  }
`;
export const PostButtons = styled.div`flex: 1;`;

// singlePost
export const SinglePostMain = styled.div``;
export const PostZone = styled.div``;
export const NoPost = styled.div`
  ${blank.py(4, 4)};
  font-size: ${({theme}) => theme.fontSize.medium};
  font-weight: ${({theme}) => theme.fontWeight.semiBold};
  text-align: center;
`;