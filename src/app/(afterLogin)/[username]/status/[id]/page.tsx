import * as style from '@/app/styles/component/post.css';
import { TopFixed, PageHeader } from '@/app/styles/component/afterLayout.css';
import { BackButton } from '@/app/_component/Button';
import { H4 } from '@/app/_component/Text';
import SinglePost from '@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost';
import CommentForm from '@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm';
import Comments from '@/app/(afterLogin)/[username]/status/[id]/_component/Comments';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getUserServer } from '@/app/(afterLogin)/[username]/_lib/getUserServer';
import { getComments } from '@/app/(afterLogin)/[username]/status/[id]/_lib/getComments';
import { User } from '@/model/User';
import { Post } from '@/model/Post';
import { getSinglePostServer } from '@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePostServer';

type Props = { params: Promise<{ id: string, username: string }> };

export async function generateMetadata({params}: Props) {
  const { username, id } = await params;
  const [ user, post ]:[User, Post] = await Promise.all([
    getUserServer({queryKey: ['users', username]}),
    getSinglePostServer({queryKey: ['posts', id]})
  ])
  return {
    title: `${user.nickname}님: ${post.content}`,
    description: post.content,
    openGraph: {
      title: `${user.nickname}님: ${post.content}`,
      description: post.content,
      images: post.Images?.length > 0 ?
      post.Images?.map((v) => ({
        url: `localhost:3000${v.link}`,
        width: 600,
        height: 400
      })) : [
        {
          url: `localhost:3000${user.image}`,
          width: 400,
          height: 400
        }
      ]
    }
  }
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['posts', id],
    queryFn: getSinglePostServer,
  });
  await queryClient.prefetchQuery({
    queryKey: ['posts', id, 'comments'],
    queryFn: getComments,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main>
      <style.SinglePostMain>
        <HydrationBoundary state={dehydratedState}>
          <TopFixed>
            <PageHeader>
              <BackButton />
              <H4 styleProps={{ size: 'medium', weight: 'semiBold' }}>게시하기</H4>
            </PageHeader>
          </TopFixed>
          <style.PostZone>
            <SinglePost id={id} />
            <CommentForm id={id} />
            {/* <div><Comments id={id} /></div> */}
          </style.PostZone>
        </HydrationBoundary>
      </style.SinglePostMain>
    </main>
  )
}