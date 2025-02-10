'use client';
import Post from "@/app/(afterLogin)/_component/Post";
import { InfiniteData, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getFollowingPosts } from '@/app/(afterLogin)/home/_lib/getFollowingPosts';
import { Post as IPost } from '@/model/Post';
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function FollowingPosts() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useSuspenseInfiniteQuery<IPost[], Object, InfiniteData<IPost[]>, [_1: string, _2: string], number>({
    queryKey: ['posts', 'followings'],
    queryFn: getFollowingPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetching]);

  return <>
    {data?.pages.map((page, idx) => (
      <Fragment key={idx}>
        {page.map((post) => <Post key={post.postId} post={post} />)}
        { }
      </Fragment>
    ))}
    {/* {!isFetching && <div ref={ref} style={{height: 50}} />}
    {isFetching && <div style={{height: 50}} />} */}
    <div ref={ref} style={{ height: 10 }} />
  </>
}