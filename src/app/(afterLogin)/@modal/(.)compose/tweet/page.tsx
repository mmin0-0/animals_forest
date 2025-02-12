'use client';
import { useRouter } from "next/navigation";
import { ChangeEventHandler, FormEvent, FormEventHandler, MouseEventHandler, useRef, useState } from "react";
import * as style from '@/app/styles/component/modal.css';
import { Button, CloseButton, UploadButton } from "@/app/_component/Button";
import TextareaAutosize from 'react-textarea-autosize';
import { FileInput } from "@/app/_component/Input";
import { PostImageZone, PostImageBox } from "@/app/styles/component/afterLayout.css";
import { ActionButton } from "@/app/_component/Button";
import { Typography } from "@/app/_component/Text";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function TweetModal() {
  const router = useRouter();
  const { data: me } = useSession();
  const imageRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState<Array<{ dataUrl: string, file: File } | null>>([]);

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => { setContent(e.target.value) };

  const onClickButton: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    imageRef.current?.click()
  };

  const onRemoveImage = (index: number) => () => {
    setPreview((prevPreview) => {
      const prev = [...prevPreview];
      prev[index] = null;
      return prev;
    })
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

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <style.ModalWrap>
      <style.ModalCont>
        <style.ModalHeader>
          <CloseButton />
        </style.ModalHeader>
        <form onSubmit={onSubmit}>
          <style.ModalBody>
            {/* <style.Original>
              <style.PostUserSection>
                <style.PostUserImg>
                  <img src={parent.User.image} alt={parent.User.id} />
                </style.PostUserImg>
                <style.OriginalPost>
                  <style.UserInfo>
                    <Typography as="strong" styleProps={{ weight: 'bold' }}>{parent.User.nickname}</Typography>
                    <Typography styleProps={{ weight: 'bold', color: 'secondary' }}>{parent.User.id}</Typography>
                  </style.UserInfo>
                  <style.PostContent>{parent.content}</style.PostContent>
                  <Typography>
                    <Link href={`/${parent.User.id}`}>@{parent.User.id} 님에게 보내는 답글</Link>
                  </Typography>
                </style.OriginalPost>
              </style.PostUserSection>
            </style.Original> */}
            <style.PostUserSection>
              <style.UserImg>
                <img src={`/images/${me?.user?.image as string}`} alt={me?.user?.email as string} />
              </style.UserImg>
              <TextareaAutosize
                name="tweetInput"
                id="tweetInput"
                onChange={onChange}
                value={content}
                placeholder="무슨 일이 일어나고 있나요?"
              />
            </style.PostUserSection>
            <PostImageZone className="postImageZone">
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
          </style.ModalBody>
          <style.ModalFooter>
            <style.ModalButtonSection>
              <style.ModalButtons>
                <FileInput id="imageFiles" name="imageFiles" multiple hidden ref={imageRef} onChange={onUpload} />
                <UploadButton onClick={onClickButton} />
              </style.ModalButtons>
              <Button type="submit" disabled={!content} styleProps={{ size: 'small' }}>게시하기</Button>
            </style.ModalButtonSection>
          </style.ModalFooter>
        </form>
      </style.ModalCont>
    </style.ModalWrap>
  )
}