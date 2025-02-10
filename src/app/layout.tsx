import type { Metadata } from "next";
import { Noto_Sans_KR } from 'next/font/google';
import localFont from 'next/font/local';
import { config } from "@fortawesome/fontawesome-svg-core";
import ThemeProviderWrap from '@/app/_component/ThemeProviderWrap';
import StyledComponentsRegistry from '@/app/_lib/registry';
import { MSWProvider } from "@/app/_component/MSWComponent";
import Head from "next/head";
import AuthSession from "@/app/_component/AuthSession";

if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_MSW_ENABLED !== 'false') {
  const { server } = require('@/mocks/http')
  server.listen()
}

config.autoAddCss = false;
const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-kr'
});

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: "45 920",
  variable: "--font-pretendard"
});

export const metadata: Metadata = {
  title: "무슨 일이 일어나고 있나요?",
  description: "Dotori Cafe inspired by X.com",
};

type Props = { children: React.ReactNode }
export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko" className={notoSansKR.variable} suppressHydrationWarning>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=share" />
      </Head>
      <body className={pretendard.className}>
        <MSWProvider>
          <AuthSession>
            <ThemeProviderWrap>
              <StyledComponentsRegistry>
                {children}
              </StyledComponentsRegistry>
            </ThemeProviderWrap>
          </AuthSession>
        </MSWProvider>
      </body>
    </html>
  );
}
