'use client'
import Post from "@/app/(afterLogin)/_component/Post";
import { useQuery } from "@tanstack/react-query";
import { Post as IPost } from "@/model/Post";
import { getSinglePost } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import { NoPost } from "@/app/styles/component/post.css";

type Props = {id: string, noImage?: boolean};
export default function SinglePost({id, noImage}: Props){
  const { data:post, error } = useQuery<IPost, Object, IPost, [_1: string, _2: string]>({
    queryKey: ['posts', id], 
    queryFn: getSinglePost,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if(error){
    return <NoPost>게시글을 찾을 수 없습니다.</NoPost>
  }

  if(!post){ //로딩중
    return null; 
  }

  return <Post key={post.postId} post={post} noImage={noImage} />
}