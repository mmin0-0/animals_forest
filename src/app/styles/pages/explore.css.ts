'use client';
import styled from 'styled-components';
import { blank, size, spacing } from '@/app/styles/utils';

export const ExploreMain = styled.div``;
export const FormZone = styled.div`${size('100%')}`;
export const TrendWrap = styled.div`
  ${spacing.mt(1)};
  > h4{
    ${blank.px(1.4, 1.4)};
    ${blank.py(1.2, 1.2)};
  }
`;