'use client';
import { ThemeProvider } from 'styled-components';
import theme from '@/app/styles/theme';
import { ReactNode } from 'react';

type Props = {children: ReactNode}
export default function ThemeProviderWrap ({children}:Props){
  return (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  )
}