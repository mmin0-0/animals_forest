import * as style from '@/app/styles/pages/search.css';
import { TopFixed, PageHeader } from '@/app/styles/component/afterLayout.css';
import { BackButton } from '@/app/_component/Button';
import SearchForm from '@/app/(afterLogin)/_component/SearchForm';
import Tab from '@/app/(afterLogin)/search/_component/Tab';
import SearchResult from '@/app/(afterLogin)/search/_component/SearchResult';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  searchParams: Promise<{q: string, f?: string, pf?: string}>;
};

export async function generateMetadata({searchParams}: Props, parent: ResolvingMetadata): Promise<Metadata>
{
  const {q} = await searchParams;
  return {
    title: `${q} - 검색`,
    description: `${q} - 검색내용`
  }
}

export default async function Page({searchParams}:Props){
  const query = await searchParams;
  return (
    <main>
      <style.SearchMain>
        <TopFixed>
          <PageHeader>
            <BackButton />
            <style.FormZone>
              <SearchForm q={query.q} f={query.f} pf={query.pf} />
            </style.FormZone>
          </PageHeader>
          <Tab />
        </TopFixed>
        <style.SearchResultList>
          <SearchResult searchParams={query} />
        </style.SearchResultList>
      </style.SearchMain>
    </main>
  )
}