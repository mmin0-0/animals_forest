'use client';
import * as style from '@/app/styles/component/header.css';
import { PostUserImgShade } from '@/app/styles/component/post.css';
import { useRouter } from 'next/navigation';
import { Strong, Span } from '@/app/_component/Text';
import { signOut } from "next-auth/react";
import { Session } from 'next-auth';

type Props = {me: Session | null};
export default function LogoutButton({me}:Props){
  const router = useRouter();
  const onLogout = () => {
    signOut({redirect: false})
    .then(()=>{
      router.replace('/');
    })
  };

  if(!me?.user){
    return null;
  }

  return (
    <style.LogoutButton onClick={onLogout}>
      <style.UserImg>
        <img src={me.user?.image as string} alt={me.user?.email as string} />
        <PostUserImgShade />
      </style.UserImg>
      <Strong styleProps={{weight: "semiBold"}}>{me.user?.name} <Span styleProps={{weight: "normal"}}>@{me.user?.email as string}</Span></Strong>
    </style.LogoutButton>
  )
}