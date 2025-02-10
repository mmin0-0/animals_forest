'use client';
import * as style from '@/app/styles/component/post.css';
import { Post } from '@/model/Post';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode, 
  post: Post
};
export default function PostArticle({children, post}: Props){
  const router = useRouter();
  let target = post;
  if(post.Original){
    target = post.Original;
  }
  
  const onClick = () => {
    router.push(`/${target.User.id}/status/${target.postId}`);
  };
  return (
    <style.Post onClick={onClick}>{children}</style.Post>
  )
}