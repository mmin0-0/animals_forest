import { css, CSSObject, Interpolation, DefaultTheme } from "styled-components";

type DeviceType = "lg" | "sm" | "xs";

const sizes: Record<DeviceType, number> = {
  lg: 1024,
  sm: 960,
  xs: 768,
};

export const media = Object.entries(sizes).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [key]: (
      first: CSSObject | TemplateStringsArray,
      ...interpolations: Interpolation<DefaultTheme>[]
    ) => css`
      @media (max-width: ${value}px) {
        ${css(first, ...interpolations)}
      }
    `,
  }),
  {} as Record<DeviceType, (first: CSSObject | TemplateStringsArray, ...interpolations: Interpolation<DefaultTheme>[]) => ReturnType<typeof css>>
);