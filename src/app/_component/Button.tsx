'use client';
import { useRouter } from "next/navigation";
import React, { ReactElement, ReactNode } from "react";
import styled, { css } from 'styled-components';
import { blank, border, flexBox, size, radius, transition } from "@/app/styles/utils";
import { media } from "@/app/styles/media";

interface ButtonStyle {
  size?: 'small' | 'medium' | 'large',
  variant?: 'primary' | 'secondary',
}

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode,
  type?: 'button' | 'submit' | 'reset',
  className?: string,
  disabled?: boolean,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  styleProps?: ButtonStyle
}

const buttonSize = {
  small: css`width: 10rem`,
  medium: css`width: 20rem;`,
  large: css`width: 30rem`
};

const buttonType = {
  primary: css`
    color: ${({ theme }) => theme.color.mainColor};
    background: ${({ theme }) => theme.color.white};
    &: hover{
      background: ${({ theme }) => theme.color.mainColor};
      color: ${({ theme }) => theme.color.white};
    }
  `,
  secondary: css`
    color: ${({ theme }) => theme.color.white};
    background: ${({ theme }) => theme.color.mainColor};
    &: hover{
      background: ${({ theme }) => theme.color.mainHover};
      border-color: ${({ theme }) => theme.color.mainHover};
    }
  `
};

const ButtonStyled = styled.button<ButtonStyle>`
  ${flexBox('row', 'center', 'center')};
  ${size('100%')};
  ${blank.py(.8, .8)};
  ${border('1px', 'solid', ({ theme }) => theme.color.mainColor)};
  white-space: nowrap;
  font-size: ${({ theme }) => theme.fontSize.regular};
  ${radius('2rem')};
  ${transition('all')};
  ${({ size }) => buttonSize[size || 'medium']};
  ${({ variant }) => buttonType[variant || 'primary']};
  &:disabled {
    color: ${({ theme }) => theme.color.black};
    background: ${({ theme }) => theme.color.gray};
    border-color: ${({ theme }) => theme.color.gray};
    cursor: not-allowed;
    pointer-events: none;
  }
  ${media.sm`
    font-size: ${({ theme }) => theme.fontSize.small};
    ${blank.py(.6, .6)};
  `};
`;

export const Button = ({
  type = "button",
  className,
  children,
  disabled,
  onClick,
  styleProps = {}
}: ButtonProps): ReactElement => {
  const { size, variant } = styleProps;
  return (
    <ButtonStyled
    type={type}
    className={className}
    disabled={disabled}
    onClick={onClick}
    size={size}
    variant={variant}
  >{children}</ButtonStyled>
  )
};

export const ActionBtnStyled = styled.button`
  border: none;
  background: transparent;
  ${blank.pc(0)};
`;

export const ActionButton = ({ type = "button", children, className, disabled, onClick }: ButtonProps) => {
  return <ActionBtnStyled type={type} className={className} disabled={disabled} onClick={onClick}>{children}</ActionBtnStyled>
};

const CloseBtnStyled = styled.button`
  ${size('3rem', '3rem')};
  ${flexBox('row', 'center', 'center')};
  ${border('1px', 'solid', ({ theme }) => theme.color.gray01)};
  background: ${({ theme }) => theme.color.gray01};
  ${radius('50%')};
`;

export const CloseButton = ({ className }: ButtonProps) => {
  const router = useRouter();
  const onClick = () => { router.back() };

  return (
    <CloseBtnStyled className={className} onClick={onClick}>
      <svg width={24} viewBox="0 0 24 24" aria-hidden="true"
        className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03">
        <g>
          <path
            d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
        </g>
      </svg>
    </CloseBtnStyled>
  )
};

const BackBtnStyled = styled.button`
  ${size('3rem', '3rem')};
  ${flexBox('row', 'center', 'center')};
  ${border('1px', 'solid', ({ theme }) => theme.color.gray01)};
  background: ${({ theme }) => theme.color.gray01};
  ${radius('50%')};
`;
export const BackButton = ({ className }: ButtonProps) => {
  const router = useRouter();
  const onClick = () => { router.back() };

  return (
    <BackBtnStyled className={className} onClick={onClick}>
      <svg width={24} viewBox="0 0 24 24" aria-hidden="true"
        className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03">
        <g>
          <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
        </g>
      </svg>
    </BackBtnStyled>
  )
};

export const UploadButtonStyle = styled.button`
  ${size('3.4rem', '3.4rem')};
  ${radius('.4rem')};
  border: none;
  background: transparent;
  ${transition('background')};
  svg{fill: rgb(${({ theme }) => theme.color.mainRgb})}
  ${blank.pc(0)};
  &:hover{background: rgba(${({theme}) => theme.color.mainRgb}, .1);}
`;
export const UploadButton = ({ className, onClick }: ButtonProps) => {
  return (
    <UploadButtonStyle className={className} onClick={onClick}>
      <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
        <g>
          <path
            d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"
          ></path>
        </g>
      </svg>
    </UploadButtonStyle>
  )
};