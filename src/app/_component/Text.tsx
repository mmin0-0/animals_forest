'use client';
import { ReactNode } from "react";
import styled, { css } from 'styled-components';

interface TxtStyle {
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge',
  weight?: 'normal' | 'medium' | 'semiBold' | 'bold'
}

interface TxtProps{
  children: ReactNode,
  className?: string,
  styleProps?: TxtStyle
};

const txtSize = {
  xsmall: css`font-size: 1.4rem`,
  small: css`font-size: 1.6rem`,
  medium: css`font-size: 1.8rem`,
  large: css`font-size: 2.4rem`,
  xlarge: css`font-size: clamp(2.8rem, 2vw, 4vw)`,
};

const txtWeight = {
  normal: css`font-weight: 400`,
  medium: css`font-weight: 500`,
  semiBold: css`font-weight: 600`,
  bold: css`font-weight: 700`,
};

const textStyle = ({size, weight}: TxtStyle) => css`
  ${size && txtSize[size]};
  ${weight && txtWeight[weight]};
`;

const StyledText = styled.span<TxtStyle>`${textStyle}`;


export const H2 = ({children, className, styleProps={}}: TxtProps) => { 
  const { size, weight } = styleProps;
  return <StyledText as="h2" size={size} weight={weight} className={className}>{children}</StyledText>};

export const H4 = ({children, className, styleProps={}}: TxtProps) => { 
  const { size, weight } = styleProps;
  return <StyledText as="h4" size={size} weight={weight} className={className}>{children}</StyledText>};

export const Strong = ({children, className, styleProps={}}: TxtProps) => { 
  const { size, weight } = styleProps;
  return <StyledText as="strong" size={size} weight={weight} className={className}>{children}</StyledText>};

export const P = ({children, className, styleProps={}}: TxtProps) => { 
  const { size, weight } = styleProps;
  return <StyledText as="p" size={size} weight={weight} className={className}>{children}</StyledText>};

export const Span = ({children, className, styleProps={}}: TxtProps) => { 
  const { size, weight } = styleProps;
  return <StyledText size={size} weight={weight} className={className}>{children}</StyledText>};