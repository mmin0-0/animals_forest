'use client';
import ActionButtons from '@/app/(afterLogin)/_component/ActionButtons';
import * as style from '@/app/styles/component/modal.css';
import { useQuery } from '@tanstack/react-query';
import { Post as IPost } from '@/model/Post';
import { getSinglePost } from '@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost';

type Props = {id: string};
export default function ImageZone({id}:Props){
  const { data:post } = useQuery<IPost, Object, IPost, [_1: string, _2: string]>({
    queryKey: ['posts', id], 
    queryFn: getSinglePost,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  
  if(!post?.Images[0]){
    return null;
  }

  return (
    <style.PhotoImageZone>
      <img src={post?.Images[0].link} alt={post?.Images[0].Post?.content} />
      <style.PhotoImage style={{backgroundImage: `url(${post?.Images[0].link})`}}></style.PhotoImage>
      <style.PhotoButtonZone>
        <ActionButtons white />
      </style.PhotoButtonZone>
    </style.PhotoImageZone>
  )
}