'use client'
import { Button, UploadButton } from '@/app/_component/Button';
import { FileInput } from '@/app/_component/Input';
import * as style from '@/app/styles/component/post.css';
import { ChangeEventHandler, FormEvent,MouseEventHandler, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { PostImageZone, PostImageBox } from '@/app/styles/component/afterLayout.css';
import { ActionButton } from '@/app/_component/Button';
import { useSession } from 'next-auth/react';

export default function PostForm() {
  const { data: me } = useSession();
  const imageRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState<Array<{ dataUrl: string, file: File } | null>>([]);

  const onSubmit = () => {};
  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => { setContent(e.target.value) };

  const onClickButton: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    imageRef.current?.click()
  };

  const onRemoveImage = (index: number) => () => {
    // setPreview((prevPreview) => {
    //   const prev = [...prevPreview];
    //   prev[index] = null;
    //   return prev;
    // })
  };

  const onUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    if (e.target.files) {
      Array.from(e.target.files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview((prevPreview) => {
            const prev = [...prevPreview];
            prev[index] = {
              dataUrl: reader.result as string,
              file,
            };
            return prev;
          })
        };
        reader.readAsDataURL(file);
      })
    }
  };

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
            <TextareaAutosize value={content} onChange={onChange} placeholder="무슨 일이 일어나고 있나요?" />
            <PostImageZone>
              {preview.map((prev, index) => (
                prev && (
                  <PostImageBox key={index}>
                    <ActionButton onClick={onRemoveImage(index)}>
                      <svg width={20} viewBox="0 0 24 24" aria-hidden="true"
                        className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03">
                        <g>
                          <path
                            d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                        </g>
                      </svg>
                    </ActionButton>
                    <img src={prev.dataUrl} alt="미리보기" />
                  </PostImageBox>
                )
              ))}
            </PostImageZone>
            <style.PostButtonSection>
              <style.PostButtons>
                <FileInput id="upload" name="imageFiles" multiple={true} hidden={true} ref={imageRef} onChange={onUpload} />
                <UploadButton onClick={onClickButton} />
              </style.PostButtons>
              <Button type="submit" className="uploadButton" styleProps={{ size: 'small' }} disabled={!content}>게시하기</Button>
            </style.PostButtonSection>
          </style.PostInputSection>
        </style.PostFormInner>
      </form>
    </style.PostForm>
  )
}