'use client';
import { css, DefaultTheme, CSSObject } from 'styled-components';

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
type Gap = string | number | undefined;

export const flexBox = (
  direction: FlexDirection,
  justify: JustifyContent,
  align: AlignItems,
  gap?: Gap
) => css`
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
  ${gap !== undefined && `gap: ${gap};`}
`;

export const ellipsis = (num = 1) => {
  if (num === 1) {
    return css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
  } else {
    return css`
      display: -webkit-box;
      overflow: hidden;
      word-break: keep-all;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: ${num};
    `;
  }
};

export const size = (
  width?: string | undefined, 
  height?: string | undefined,
) => css`
  ${width && `width: ${width};`}
  ${height && `height: ${height};`}
`; 

type BorderDirection = 'top' | 'bottom' | 'left' | 'right' | 'all';
export const border = (
  width: string, 
  style: string, 
  color: string | ((theme: DefaultTheme) => string), 
  direction: BorderDirection = 'all'
) => {
  if (direction === 'all') {
    return css`border: ${width} ${style} ${color};`;
  }
  return css`border-${direction}: ${width} ${style} ${color};`;
};

export const radius = (
  radius: string
) => css`
  ${radius && `border-radius: ${radius};`}
`;

export const transition = (property: string, duration: string = '.25s', timingFn: string = 'ease') => css`
  ${property && duration && `transition: ${property} ${duration} ${timingFn};`}
`;

type SpacingValue = number | string;
const createSpacing = (property: string, value: SpacingValue): CSSObject => ({
  [property]: typeof value === 'number' ? `${value}rem` : value
});

export const spacing = {
  mt: (value: SpacingValue) => css(createSpacing('marginTop', value)),
  mb: (value: SpacingValue) => css(createSpacing('marginBottom', value)),
  ml: (value: SpacingValue) => css(createSpacing('marginLeft', value)),
  mr: (value: SpacingValue) => css(createSpacing('marginRight', value)),
  mx: (left: SpacingValue, right: SpacingValue) => css`
    ${createSpacing('marginLeft', left)};
    ${createSpacing('marginRight', right)};
  `,
  my: (top: SpacingValue, bottom: SpacingValue) => css`
    ${createSpacing('marginTop', top)};
    ${createSpacing('marginBottom', bottom)};
  `,
  m: (top: SpacingValue, right: SpacingValue, bottom: SpacingValue, left: SpacingValue) => css`
    ${createSpacing('marginTop', top)};
    ${createSpacing('marginRight', right)};
    ${createSpacing('marginBottom', bottom)};
    ${createSpacing('marginLeft', left)};
  `,
  mc: (value: SpacingValue) => css(createSpacing('margin', value)),
  ma: css`margin: 0 auto;`
};

export const blank = {
  pt: (value: SpacingValue) => css(createSpacing('paddingTop', value)),
  pb: (value: SpacingValue) => css(createSpacing('paddingBottom', value)),
  pl: (value: SpacingValue) => css(createSpacing('paddingLeft', value)),
  pr: (value: SpacingValue) => css(createSpacing('paddingRight', value)),
  px: (left: SpacingValue, right: SpacingValue) => css`
    ${createSpacing('paddingLeft', left)};
    ${createSpacing('paddingRight', right)};
  `,
  py: (top: SpacingValue, bottom: SpacingValue) => css`
    ${createSpacing('paddingTop', top)};
    ${createSpacing('paddingBottom', bottom)};
  `,
  p: (top: SpacingValue, right: SpacingValue, bottom: SpacingValue, left: SpacingValue) => css`
  ${createSpacing('paddingTop', top)};
  ${createSpacing('paddingRight', right)};
  ${createSpacing('paddingBottom', bottom)};
  ${createSpacing('paddingLeft', left)};
  `,
  pc: (value: SpacingValue) => css(createSpacing('padding', value)),
};

type PositionType = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
type Direction = 'top' | 'bottom' | 'left' | 'right';
type DirectionValues = Partial<Record<Direction, string>>;
export const position = (
  type: PositionType = 'static',
  values: DirectionValues = {}
) => css`
  position: ${type};
  ${Object.entries(values)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n')}
`;