'use client';
import * as style from '@/app/styles/component/header.css';
import { PostUserImgShade } from '@/app/styles/component/post.css';
import { useRouter } from 'next/navigation';
import { Typography } from '@/app/_component/Text';
import { signOut, useSession } from "next-auth/react";

export default function LogoutButton(){
  const { data:me } = useSession();
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
        <img src={`${me.user?.image as string}`} alt={me.user?.email as string} />
        <PostUserImgShade />
      </style.UserImg>
      <Typography as="strong" styleProps={{weight: 'semiBold'}}>
        {me.user?.name}
        <Typography as="span" styleProps={{color: 'secondary'}}>@{me.user?.email as string}</Typography>
      </Typography>
    </style.LogoutButton>
  )
}