import { useEffect, useState } from 'react';
import { getPostRecommends } from './getPostRecommends'; // 포스트 추천 API 호출
import { getUsers } from '@/utils/getUsers'; // 유저 정보 API 호출
import Post from './Post'; // Post 컴포넌트

export default function PostRecommends() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const { data, hasNextPage, fetchNextPage, isFetching, isPending } = useSuspenseInfiniteQuery<IPost[], Object, InfiniteData<IPost[]>, [_1: string, _2: string], string>({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.at(-1)?.createdAt,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers();  // 유저 데이터 호출
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (isFetching) {
      return;
    }

    if (hasNextPage) {
      fetchNextPage();
    }
  }, [isFetching, hasNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <div className="loading">
        <svg className="loader" height="100%" viewBox="0 0 32 32" width={40}>
          <circle cx="16" cy="16" fill="none" r="14" strokeWidth="4" style={{ stroke: 'rgb(0, 160, 95)', opacity: 0.2 }}></circle>
          <circle cx="16" cy="16" fill="none" r="14" strokeWidth="4" style={{ stroke: 'rgb(0, 160, 95)', strokeDasharray: 80, strokeDashoffset: 60 }}></circle>
        </svg>
      </div>
    );
  }

  return (
    <>
      {data?.pages.map((page, idx) => (
        <Fragment key={idx}>
          {page.map((post) => (
            <Post key={post.postId} post={post} users={users} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 10 }} />
    </>
  );
}
