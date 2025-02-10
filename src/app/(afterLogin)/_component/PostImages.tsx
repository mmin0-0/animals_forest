import * as style from '@/app/styles/component/post.css';
import { User } from '@/model/User';
import { PostImage } from '@/model/PostImage';
import Link from 'next/link';
import { MouseEventHandler } from 'react';

type Props = {
  post: {
    postId: number,
    content: string,
    User: User,
    createdAt: Date,
    Images: PostImage[],
  }
}
export default function PostImages({ post }: Props) {
  const stopPropagation: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.stopPropagation();
  };

  if (!post.Images) return null;
  if (!post.Images.length) return null;
  if (post.Images.length === 1) {
    return (
      <style.PostImageSection className="oneImage">
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
          style={{ backgroundImage: `url(${post.Images[0]?.link})`, backgroundSize: 'contain' }} onClick={stopPropagation}
        >
          <img src={post.Images[0]?.link} alt="게시물" />
        </Link>
      </style.PostImageSection>
    )
  }
  if (post.Images.length === 2) {
    return (
      <style.PostImageSection className="twoImage">
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
          style={{ backgroundImage: `url(${post.Images[0]?.link})`, backgroundSize: 'cover' }} onClick={stopPropagation}
        />
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`}
          style={{ backgroundImage: `url(${post.Images[1]?.link})`, backgroundSize: 'cover' }} onClick={stopPropagation}
        />
      </style.PostImageSection>
    )
  }
  if (post.Images.length === 3) {
    return (
      <style.PostImageSection className="threeImage">
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
          style={{ backgroundImage: `url(${post.Images[0]?.link})`, backgroundSize: 'cover' }} onClick={stopPropagation}
        />
        <div>
          <Link
            href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`}
            style={{ backgroundImage: `url(${post.Images[1]?.link})`, backgroundSize: 'cover' }} onClick={stopPropagation}
          />
          <Link
            href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[2].imageId}`}
            style={{ backgroundImage: `url(${post.Images[2]?.link})`, backgroundSize: 'cover' }} onClick={stopPropagation}
          />
        </div>
      </style.PostImageSection>
    )
  }
  if (post.Images.length === 4) {
    return (
      <style.PostImageSection className="fourImage">
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
          style={{ backgroundImage: `url(${post.Images[0]?.link})`, backgroundSize: 'cover' }} onClick={stopPropagation}
        />
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`}
          style={{ backgroundImage: `url(${post.Images[1]?.link})`, backgroundSize: 'cover' }} onClick={stopPropagation}
        />
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[2].imageId}`}
          style={{ backgroundImage: `url(${post.Images[2]?.link})`, backgroundSize: 'cover' }} onClick={stopPropagation}
        />
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[3].imageId}`}
          style={{ backgroundImage: `url(${post.Images[3]?.link})`, backgroundSize: 'cover' }} onClick={stopPropagation}
        />
      </style.PostImageSection>
    )
  }
  return null;
}