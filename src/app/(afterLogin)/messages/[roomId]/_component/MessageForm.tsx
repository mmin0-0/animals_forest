'use client';
import { ActionButton } from '@/app/_component/Button';
import * as style from '@/app/styles/pages/messages.css';
import { ChangeEventHandler, FormEventHandler, KeyboardEventHandler, useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useSession } from 'next-auth/react';
import { useQueryClient } from '@tanstack/react-query';

export default function MessageForm() {
  const [content, setContent] = useState('');
  const {data: session} = useSession();
  const queryClient = useQueryClient();
  
  const onChangeContent: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value)
  };

  const onSubmit = () => {alert('준비 중 입니다!')};

  const onEnter: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
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