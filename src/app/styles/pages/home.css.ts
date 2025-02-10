'use client';
import styled, {keyframes} from 'styled-components';
import { flexBox } from '@/app/styles/utils';

export const HomeMain = styled.div``;

// Loading
const rotating = keyframes`
  from: {rotate: 0deg;}
  to: {rotate: 360deg;}
`;
export const LoadingWrap = styled.div`
  flex: 1;
  ${flexBox('row', 'center', 'center')};
`;
export const Loader = styled.div`animation: ${rotating} 2s linear infinite`;

// postRecommends && FollowPosts
