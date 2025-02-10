import styled from 'styled-components';
import { size, border, spacing, blank, position, radius } from '@/app/styles/utils';

export const InputWrap = styled.div`
  ${size('100%', undefined)};
  position: relative;
  .inputLabel{
    ${size('100%', undefined)};
    ${spacing.mb(.6)};
    display: inline-block;
    font-size: ${({theme}) => theme.fontSize.small};
    font-weight: ${({theme}) => theme.fontWeight.semiBold};
  }
  i { // search icon
    ${position('absolute', {top: '50%', right: '1rem'})};
    transform: translateY(-50%);
  }
  
  textarea {width: 100%;}

  // radio input
  input[type="radio"] {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    WebkitClipPath: polygon(0 0, 0 0, 0 0);
    clipPath: polygon(0 0, 0 0, 0 0);
    + label {
      position: relative;
      ${blank.pl(2.8)};
      line-height: 2rem;
      font-size: ${({theme}) => theme.fontSize.small};
      white-space: nowrap;
      &::before, &::after {
        content: '';
        ${position('absolute', {top: '50%', left: '0'})};
        transform: translateY(-50%);
        ${radius('50%')};
      }
      &::before {
        ${size('2rem', '2rem')};
        transform: translateY(-50%);
        background: ${({theme}) => theme.color.white};
        ${border('1px', 'solid',({ theme }) => theme.color.gray)};
      }
      &::after {
        ${size('1rem', '1rem')};
        left: .6rem;
        transform: translateY(-50%) scale(1);
        background: ${({theme}) => theme.color.mainColor};
        opacity: 0;
      }
    }
    &:checked {
      + label {
        &::before {border-color: ${({theme}) => theme.color.mainColor};}
        &::after {opacity: 1;}
      }
    }
    &:disabled {pointer-events: none;}
  }

  // search input
  input[type="search"] {
    ${size('100%', undefined)};
    ${blank.p(1.2, 3.6, 1.2, 1.4)};
    background: ${({theme}) => theme.color.white};
    ${border('1px', 'solid', ({theme}) => theme.color.gray01)};
    ${radius('2rem')};
    &:focus{border-color: ${({theme}) => theme.color.mainColor}}
    &::-ms-clear, input::-ms-reveal{display:none;}
    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration{display:none;}
  }
`;

export const InputLabel = styled.label`
  ${size('100%', undefined)};
  ${spacing.mb(.6)};
  display: inline-block;
  font-size: ${({theme}) => theme.fontSize.small};
  font-weight: ${({theme}) => theme.fontWeight.semiBold};
`;

// pw input
export const InputGroup = styled.div`position: relative;`;
export const Eye = styled.span`
  ${position('absolute', {top: '50%', right: '.8rem'})};
  transform: translateY(-50%);
  cursor: pointer;
  color: ${({theme}) => theme.color.gray};
`;

