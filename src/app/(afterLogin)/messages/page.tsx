import * as style from '@/app/styles/pages/messages.css';
import { TopFixed, PageHeader } from '@/app/styles/component/afterLayout.css';
import { BackButton } from '@/app/_component/Button';
import { Typography } from '@/app/_component/Text';
import { Metadata } from 'next';
import { auth } from '@/auth';
import RoomList from '@/app/(afterLogin)/messages/_component/RoomList';

export const metadata: Metadata = {
  title: '쪽지',
  description: '쪽지를 보내보세요.'
};

export default async function Page() {
  const session = await auth();
  return (
    <main>
      <style.MessagesMain>
        <TopFixed>
          <PageHeader>
            <BackButton />
            <Typography as="h4" styleProps={{weight: "semiBold"}}>쪽지</Typography>
          </PageHeader>
        </TopFixed>
        <style.MessagesCont>
          <RoomList  />
        </style.MessagesCont>
      </style.MessagesMain>
    </main>
  )
}