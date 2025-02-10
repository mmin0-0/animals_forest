import * as style from '@/app/styles/pages/home.css';
import { Metadata } from "next";
import Tab from '@/app/(afterLogin)/home/_component/Tab';
import TabProvider from '@/app/(afterLogin)/home/_component/TabProvider';
import PostForm from '@/app/(afterLogin)/home/_component/PostForm';
import Loading from '@/app/(afterLogin)/home/Loading';
import { Suspense } from 'react';
import TabDeciderSuspense from '@/app/(afterLogin)/home/_component/TabDeciderSuspense';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: "모여봐요 동물의 숲 커뮤니티",
  description: "홈",
};

export default async function Page() {
  const session = await auth();

  return (
    <main>
      <style.HomeMain>
        <TabProvider>
          <Tab />
          <PostForm />
          <Suspense fallback={<Loading />}>
            <TabDeciderSuspense />
          </Suspense>
        </TabProvider>
      </style.HomeMain>
    </main>
  )
}