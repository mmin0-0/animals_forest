import * as style from '@/app/styles/pages/messages.css';
import { TopFixed, PageHeader } from '@/app/styles/component/afterLayout.css';
import { BackButton } from '@/app/_component/Button';
import { H4 } from '@/app/_component/Text';
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
            <H4 styleProps={{ weight: 'semiBold' }}>쪽지</H4>
          </PageHeader>
        </TopFixed>
        <style.MessagesCont>
          <RoomList  />
        </style.MessagesCont>
      </style.MessagesMain>
    </main>
  )
}