'use client';
import { ActionButton } from '@/app/_component/Button';
import * as style from '@/app/styles/pages/messages.css';
import { ChangeEventHandler, FormEventHandler, KeyboardEventHandler, useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import useSocket from '@/app/(afterLogin)/messages/[room]/_lib/useSocket';
import { useSession } from 'next-auth/react';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { Message } from '@/model/Message';
import { useMessageStore } from '@/app/store/message';

type Props = {id: string};
export default function MessageForm({id}:Props) {
  const [content, setContent] = useState('');
  const setGoDown = useMessageStore().setGoDown;
  const [socket] = useSocket();
  const {data: session} = useSession();
  const queryClient = useQueryClient();
  
  const onChangeContent: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value)
  };

  const onSubmit = () => {
    if (!session?.user?.email) {
      return;
    }
    const ids = [session?.user?.email, id];
    ids.sort();
    // socket.io
    socket?.emit('sendMessage', {
      senderId: session?.user?.email,
      receiverId: id,
      content,
    });
    // 리액트 쿼리 데이터에 추가
    const exMessages = queryClient.getQueryData(['rooms', {
      senderId: session?.user?.email,
      receiverId: id
    }, 'messages']) as InfiniteData<Message[]>;
    if (exMessages && typeof exMessages === 'object') {
      const newMessages = {
        ...exMessages,
        pages: [
          ...exMessages.pages
        ],
      };
      const lastPage = newMessages.pages.at(-1);
      const newLastPage = lastPage ? [...lastPage] : [];
      let lastMessageId = lastPage?.at(-1)?.messageId;
      newLastPage.push({
        senderId: session.user.email,
        receiverId: id,
        content,
        room: ids.join('-'),
        messageId: lastMessageId ? lastMessageId + 1 : 1,
        createdAt: new Date(),
      })
      newMessages.pages[newMessages.pages.length - 1] = newLastPage;
      queryClient.setQueryData(['rooms', {senderId: session?.user?.email, receiverId: id}, 'messages'], newMessages);
      setGoDown(true);
    }
    setContent('');
  }
  const onEnter: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    console.log(e.key === 'Enter', e);
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return;
      }
      e.preventDefault();
      if (!content?.trim()) {
        return;
      }
      onSubmit();
      setContent('');
    }
  }

  return (
    <style.FormZone>
      <form onSubmit={(e)=>{
        e.preventDefault();
        onSubmit();
      }}>
        <TextareaAutosize value={content} onChange={onChangeContent} onKeyDown={onEnter} placeholder="새 쪽지 작성하기" />
        <ActionButton type="submit" disabled={!content?.trim()}>
          <svg viewBox="0 0 24 24" width={24} aria-hidden="true"><g><path d="M2.504 21.866l.526-2.108C3.04 19.719 4 15.823 4 12s-.96-7.719-.97-7.757l-.527-2.109L22.236 12 2.504 21.866zM5.981 13c-.072 1.962-.34 3.833-.583 5.183L17.764 12 5.398 5.818c.242 1.349.51 3.221.583 5.183H10v2H5.981z"></path></g></svg>
        </ActionButton>
      </form>
    </style.FormZone>
  )
}