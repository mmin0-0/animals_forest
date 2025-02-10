'use client';
import { UploadButton, Button } from '@/app/_component/Button';
import { FileInput } from '@/app/_component/Input';
import * as style from '@/app/styles/component/post.css';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { ChangeEventHandler, MouseEventHandler, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

type Props={id: string};
export default function CommentForm({id}:Props) {
  const { data:me } = useSession();
  const [ content, setContent ] = useState('');
  const imageRef = useRef<HTMLInputElement>(null);

  const onSubmit = () => {console.log('comment form')};

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => { setContent(e.target.value) };

  const onClickButton: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    imageRef.current?.click()
  };

  const queryClient = useQueryClient();
  const post = queryClient.getQueryData(['posts', id]);

  if(!post){
    return null;
  }

  return (
    <style.PostForm>
      <form onSubmit={onSubmit}>
        <style.PostFormInner>
          <style.UserInfo>
            <style.UserImg>
              <img src={`/images/${me?.user?.image as string}`} alt={me?.user?.email as string} />
            </style.UserImg>
          </style.UserInfo>
          <style.PostInputSection>
            <TextareaAutosize id="comment" name="comment" value={content} onChange={onChange} placeholder="답글 게시하기" />
            <style.PostButtonSection>
              <style.PostButtons>
                <FileInput id="upload" name="imageFiles" multiple={true} hidden={true} ref={imageRef} />
                <UploadButton onClick={onClickButton} />
              </style.PostButtons>
              <Button type="submit" className="uploadButton" styleProps={{size: 'small'}} disabled={!content}>답글</Button>
            </style.PostButtonSection>
          </style.PostInputSection>
        </style.PostFormInner>
      </form>
    </style.PostForm>
  )
}