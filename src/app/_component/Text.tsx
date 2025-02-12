'use client';
import { ElementType, forwardRef, ReactNode } from "react";
import styled, { css } from 'styled-components';

interface TxtStyle {
  size?: 'small' | 'regular' | 'medium' | 'large' | 'xlarge';
  weight?: 'normal' | 'medium' | 'semiBold' | 'bold';
  color?: 'primary' | 'secondary' | 'light' | 'error';
}

interface TxtProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  styleProps?: TxtStyle;
}

const textStyle = ({ size, weight, color, theme }: TxtStyle & { theme: any }) => css`
  font-size: ${size ? theme.fontSize[size] : size="regular"};
  font-weight: ${weight ? theme.fontWeight[weight] : weight="normal"};
  color: ${color ? theme.fontColor[color] : color="primary"};
`;

const StyledText = styled.p<TxtStyle>`
  ${({ size, weight, color, theme }) => textStyle({ size, weight, color, theme })}
`;

export const Typography = forwardRef<HTMLElement, TxtProps>(({
  as: Component = 'p', children, className, styleProps = {}, ...props
}, ref) => {
  return (
    <StyledText
      as={Component}
      ref={ref}
      className={className}
      size={styleProps.size}
      weight={styleProps.weight}
      color={styleProps.color}
      {...props}
    >
      {children}
    </StyledText>
  );
});

Typography.displayName = 'Typography';
