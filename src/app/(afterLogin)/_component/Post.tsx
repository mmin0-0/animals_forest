import * as style from '@/app/styles/component/post.css';
import PostArticle from '@/app/(afterLogin)/_component/PostArticle';
import PostImages from '@/app/(afterLogin)/_component/PostImages';
import Link from 'next/link';
import { MouseEventHandler } from 'react';
import { P, Span } from '@/app/_component/Text';
import { Post as IPost } from '@/model/Post';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import ActionButtons from '@/app/(afterLogin)/_component/ActionButtons';

dayjs.locale('ko');
dayjs.extend(relativeTime);

type Props = { noImage?: boolean, post: IPost };
export default function Post({ noImage, post }: Props) {
  let target = post;
  if (post.Original) {
    target = post.Original;
  }

  const stopPropagation: MouseEventHandler<HTMLAnchorElement> = (e) => { e.stopPropagation() };

  return (
    <PostArticle post={target}>
      {post.Original && <style.PostReposted>
        <svg viewBox="0 0 24 24" width={16} aria-hidden="true"
          className="r-14j79pv r-4qtqp9 r-yyyyoo r-10ptun7 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1janqcz">
          <g>
            <path
              d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"></path>
          </g>
        </svg>
        재게시했습니다.
      </style.PostReposted>}
      <style.PostWrapper>
        <style.PostUserSection>
          <style.UserImg as="a" href={`/${target.User.id}`} onClick={stopPropagation}>
            <img src={target.User.image} alt={target.User.nickname} />
            <style.PostUserImgShade />
          </style.UserImg>
        </style.PostUserSection>
        <style.PostBody>
          <style.PostMeta>
            <style.postUserName href={`/${target.User.id}`} onClick={stopPropagation}>
              <P styleProps={{ weight: 'semiBold' }}>{target.User.nickname}</P>
              <Span styleProps={{ weight: 'medium' }}>@ {target.User.id}</Span>
            </style.postUserName>
            <Span>{dayjs(target.createdAt).fromNow(true)}</Span>
          </style.PostMeta>
          {target.Parent && <style.PostComment>
            <Link href={`/${target.User.id}`} onClick={stopPropagation}>@{target.User.id} 님에게 보내는 답글</Link>
          </style.PostComment>}
          <style.PostContent>{target.content}</style.PostContent>
          {!noImage && <div>
            <PostImages post={target} />
          </div>}
          <ActionButtons />
        </style.PostBody>
      </style.PostWrapper>
    </PostArticle>
  )
}