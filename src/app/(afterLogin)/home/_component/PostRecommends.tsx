'use client';
import Post from "@/app/(afterLogin)/_component/Post";
import { InfiniteData,  useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getPostRecommends } from '@/app/(afterLogin)/home/_lib/getPostRecommends';
import { Post as IPost } from '@/model/Post';
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { LoadingWrap, Loader } from '@/app/styles/pages/home.css';

export default function PostRecommends() {
  const { data, hasNextPage, fetchNextPage, isFetching, isPending } = useSuspenseInfiniteQuery<IPost[], Object, InfiniteData<IPost[]>, [_1: string, _2: string], number>({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage ]);

  if (isPending) {
    return (
      <div className={LoadingWrap}>
        <svg className={Loader} height="100%" viewBox="0 0 32 32" width={40} >
          <circle cx="16" cy="16" fill="none" r="14" strokeWidth="4" style={{ stroke: 'rgb(0, 160, 95)', opacity: 0.2 }}></circle>
          <circle cx="16" cy="16" fill="none" r="14" strokeWidth="4" style={{ stroke: 'rgb(0, 160, 95)', strokeDasharray: 80, strokeDashoffset: 60 }}></circle>
        </svg>
      </div>
    )
  }

  return (
    <>
      {data?.pages.map((page, idx) => (
        <Fragment key={idx}>
          {page.map((post) => <Post key={post.postId} post={post} />)}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 10 }} />
    </>
  )
}