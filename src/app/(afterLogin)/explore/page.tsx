import TrendSection from '@/app/(afterLogin)/explore/_component/TrendSection';
import SearchForm from '@/app/(afterLogin)/_component/SearchForm';
import * as style from '@/app/styles/pages/explore.css';
import { Typography } from '@/app/_component/Text';
import { TopFixed, PageHeader } from '@/app/styles/component/afterLayout.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "탐색하기",
  description: "탐색해보세요.",
};

export default function Page() {
  return (
    <main>
      <style.ExploreMain>
        <TopFixed>
          <PageHeader>
            <style.FormZone>
              <SearchForm />
            </style.FormZone>
          </PageHeader>
        </TopFixed>
        <style.TrendWrap>
          <Typography as="h4" styleProps={{ size: 'medium', weight: 'semiBold' }}>나를 위한 트렌드</Typography>
          <TrendSection />
        </style.TrendWrap>
      </style.ExploreMain>
    </main>
  )
}