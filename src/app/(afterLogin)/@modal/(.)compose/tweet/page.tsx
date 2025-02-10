'use client';
import { useRouter } from "next/navigation";
import { ChangeEventHandler, FormEvent, FormEventHandler, MouseEventHandler, useRef, useState } from "react";
import * as style from '@/app/styles/component/modal.css';
import { Button, CloseButton, UploadButton } from "@/app/_component/Button";
import TextareaAutosize from 'react-textarea-autosize';
import { FileInput } from "@/app/_component/Input";
import { PostImageZone, PostImageBox } from "@/app/styles/component/afterLayout.css";
import { ActionButton } from "@/app/_component/Button";
import { Strong, P } from "@/app/_component/Text";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "@/model/Post";
import { useModalStore } from "@/app/store/modal";

export default function TweetModal() {
  const router = useRouter();
  const { data: me } = useSession();
  const imageRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState<Array<{ dataUrl: string, file: File } | null>>([]);
  const queryClient = useQueryClient();
  const modalStore = useModalStore();
  const parent = modalStore.data;

  const mutation = useMutation({
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('content', content);
      preview.forEach((p) => {
        p && formData.append('images', p.file);
      })
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
        method: 'post',
        credentials: 'include',
        body: formData,
      });
    },
    async onSuccess(response) {
      const newPost = await response.json();
      setContent('');
      setPreview([]);
      const queryCache = queryClient.getQueryCache()
      const queryKeys = queryCache.getAll().map(cache => cache.queryKey)
      console.log('queryKeys', queryKeys);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === 'posts') {
          console.log(queryKey[0]);
          const value: Post | InfiniteData<Post[]> | undefined = queryClient.getQueryData(queryKey);
          if (value && 'pages' in value) {
            console.log('array', value);
            const obj = value.pages.flat().find((v) => v.postId === parent?.postId);
            if (obj) { // 존재는 하는지
              const pageIndex = value.pages.findIndex((page) => page.includes(obj));
              const index = value.pages[pageIndex].findIndex((v) => v.postId === parent?.postId);
              console.log('found index', index);
              const shallow = {
                ...value,
                pages: [...value.pages],
              };
              shallow.pages[0] = [...shallow.pages[0]];
              shallow.pages[0].unshift(newPost); // 새 게시글 추가
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      });
      await queryClient.invalidateQueries({
        queryKey: ['trends']
      });
    },
    onError(error) {
      console.error(error);
      alert('업로드 중 에러가 발생했습니다.');
    },
    onSettled() {
      router.back();
    }
  });

  const comment = useMutation({
    mutationFn: (e: FormEvent) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('content', content);
      preview.forEach((p) => {
        p && formData.append('images', p.file);
      })
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${parent?.postId}/comments`, {
        method: 'post',
        credentials: 'include',
        body: formData,
      });
    },
    async onSuccess(response, variable) {
      const newPost = await response.json();
      setContent('');
      setPreview([]);
      const queryCache = queryClient.getQueryCache()
      const queryKeys = queryCache.getAll().map(cache => cache.queryKey)
      console.log('queryKeys', queryKeys);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === 'posts') {
          console.log(queryKey[0]);
          const value: Post | InfiniteData<Post[]> | undefined = queryClient.getQueryData(queryKey);
          if (value && 'pages' in value) {
            console.log('array', value);
            const obj = value.pages.flat().find((v) => v.postId === parent?.postId);
            if (obj) { // 존재는 하는지
              const pageIndex = value.pages.findIndex((page) => page.includes(obj));
              const index = value.pages[pageIndex].findIndex((v) => v.postId === parent?.postId);
              console.log('found index', index);
              const shallow = { ...value };
              value.pages = {...value.pages }
              value.pages[pageIndex] = [...value.pages[pageIndex]];
              shallow.pages[pageIndex][index] = {
                ...shallow.pages[pageIndex][index],
                Comments: [{ userId: me?.user?.email as string }],
                _count: {
                  ...shallow.pages[pageIndex][index]._count,
                  Comments: shallow.pages[pageIndex][index]._count.Comments + 1,
                }
              }
              shallow.pages[0].unshift(newPost); // 새 답글 추가
              queryClient.setQueryData(queryKey, shallow);
            }
          } else if (value) {
            // 싱글 포스트인 경우
            if (value.postId === parent?.postId) {
              const shallow = {
                ...value,
                Comments: [{ userId: me?.user?.email as string }],
                _count: {
                  ...value._count,
                  Comments: value._count.Comments + 1,
                }
              }
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      });
      await queryClient.invalidateQueries({
        queryKey: ['trends']
      });
    },
    onError(error) {
      console.error(error);
      alert('업로드 중 에러가 발생했습니다.');
    },
    onSettled() {
      modalStore.reset();
      router.back();
    }
  });

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
    if (modalStore.mode === 'new') {
      mutation.mutate(e);
    } else {
      comment.mutate(e);
    }
  };

  return (
    <style.ModalWrap>
      <style.ModalCont>
        <style.ModalHeader>
          <CloseButton />
        </style.ModalHeader>
        <form onSubmit={onSubmit}>
          <style.ModalBody>
            {modalStore.mode === 'comment' && parent && (
              <style.Original>
                <style.PostUserSection>
                  <style.PostUserImg>
                    <img src={parent.User.image} alt={parent.User.id} />
                  </style.PostUserImg>
                  <style.OriginalPost>
                    <style.UserInfo>
                      <Strong styleProps={{ weight: 'bold' }}>{parent.User.nickname}</Strong>
                      <P>{parent.User.id}</P>
                    </style.UserInfo>
                    <style.PostContent>{parent.content}</style.PostContent>
                    <P>
                      <Link href={`/${parent.User.id}`}>@{parent.User.id}</Link>
                      님에게 보내는 답글
                    </P>
                  </style.OriginalPost>
                </style.PostUserSection>
              </style.Original>
            )}
            <style.PostUserSection>
              <style.UserImg>
                <img src={me?.user?.image as string} alt={me?.user?.email as string} />
              </style.UserImg>
              <TextareaAutosize 
                name="tweetInput" 
                id="tweetInput" 
                onChange={onChange} 
                value={content} 
                placeholder={modalStore.mode === 'comment' ? '답글 게시하기' : '무슨 일이 일어나고 있나요?'} 
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