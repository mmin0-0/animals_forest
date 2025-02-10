'use client';
import { TabContext } from "@/app/(afterLogin)/home/_component/TabProvider";
import { useContext } from "react";
import PostRecommends from "@/app/(afterLogin)/home/_component/PostRecommends";
import FollowingPosts from "@/app/(afterLogin)/home/_component/FollowingPosts";

export default function TabDecider(){
  const { tab } = useContext(TabContext);
  if(tab === 'rec'){
    return <PostRecommends />
  }
  return <FollowingPosts />
}