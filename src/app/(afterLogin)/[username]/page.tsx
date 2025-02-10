import * as style from '@/app/styles/pages/profile.css';
import UserInfo from '@/app/(afterLogin)/[username]/_component/UserInfo';
import UserPost from '@/app/(afterLogin)/[username]/_component/UserPost';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getUserPosts } from '@/app/(afterLogin)/[username]/_lib/getUserPosts';
import { auth } from '@/auth';
import { getUserServer } from '@/app/(afterLogin)/[username]/_lib/getUserServer';
import { User } from '@/model/User';

type Props = {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({params}: Props) {
  const { username } = await params;
  const user: User = await getUserServer({ queryKey: ['users', username] });
  return {
    title: `${user.nickname}(${user.id}) / 프로필`,
    description: `${user.nickname}(${user.id}) 프로필`,
    openGraph: {
      title: `${user.nickname}(${user.id}) / 프로필`,
      description: `${user.nickname}(${user.id}) 프로필`,
      images: [
        {
          url: `localhost:3000${user.image}`,
          width: 400,
          height: 400
        }
      ]
    }
  }
}

export default async function Page(props: Props) {
  const { username } = await props.params;
  const session = await auth();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['users', username],
    queryFn: getUserServer,
  });
  await queryClient.prefetchQuery({
    queryKey: ['posts', 'users', username],
    queryFn: getUserPosts,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main>
      <style.ProfileMain>
        <HydrationBoundary state={dehydratedState}>
          <UserInfo username={username} />
          <div>
            <UserPost username={username} />
          </div>
        </HydrationBoundary>
      </style.ProfileMain>
    </main>
  )
}