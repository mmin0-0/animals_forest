'use client';
import * as style from '@/app/styles/pages/messages.css';
import { P } from '@/app/_component/Text';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';
import { DefaultError, InfiniteData, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getMessages } from '@/app/(afterLogin)/messages/[room]/_lib/getMessages';
import { useSession } from 'next-auth/react';
import { Message } from '@/model/Message';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef, useState } from 'react';
import { useMessageStore } from '@/app/store/message';
import useSocket from '@/app/(afterLogin)/messages/[room]/_lib/useSocket';

dayjs.locale('ko');
dayjs.extend(relativeTime);

type Props = { id: string };
export default function MessageList({ id }: Props) {
  const {data: session} = useSession();
  const shouldGoDown = useMessageStore().shouldGoDown;
  const setGoDown = useMessageStore().setGoDown;
  const listRef = useRef<HTMLDivElement>(null);
  const [pageRendered, setPageRendered] = useState(false);
  const [adjustingScroll, setAdjustingScroll] = useState(false);
  const {
    data: messages,
    isFetching,
    hasPreviousPage,
    fetchPreviousPage,
  } = useInfiniteQuery<Message[], DefaultError, InfiniteData<Message[]>, [string, {
    senderId: string,
    receiverId: string
  }, string], number>({
    queryKey: ['rooms', {senderId: session?.user?.email!, receiverId: id}, 'messages'],
    queryFn: getMessages,
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => firstPage.length < 10 ? undefined : firstPage.at(0)?.messageId,
    getNextPageParam: (lastPage) => lastPage.length < 10 ? undefined : lastPage.at(-1)?.messageId,
    enabled: !!(session?.user?.email && id),
  });

  const {ref, inView} = useInView({
    threshold: 0,
    delay: 0,
  });

  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.resetQueries({
      queryKey: ['rooms', {senderId: session?.user?.email!, receiverId: id}, 'messages'],
    });
  }, [queryClient, session?.user?.email, id]);

  useEffect(() => {
    if (inView) {
      if (!isFetching && hasPreviousPage && !adjustingScroll) {
        const prevHeight = listRef.current?.scrollHeight || 0;
        fetchPreviousPage()
          .then(() => {
            setAdjustingScroll(true);
            setTimeout(() => {
              console.log('prevHeight', prevHeight, listRef.current?.scrollHeight);
              if (listRef.current) {
                listRef.current.scrollTop = listRef.current.scrollHeight - prevHeight;
              }
              setAdjustingScroll(false);
            }, 0);
          });
      }
    }
  }, [inView, isFetching, hasPreviousPage, fetchPreviousPage, adjustingScroll]);

  let hasMessages = !!messages;
  useEffect(() => {
    if (hasMessages) {
      console.log(listRef.current);
      setTimeout(() => {
        if (listRef.current) {
          listRef.current.scrollTop = listRef.current?.scrollHeight;
        }
      }, 100);
      setPageRendered(true);
    }
  }, [hasMessages]);

  useEffect(() => {
    if (shouldGoDown) {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current?.scrollHeight;
        setGoDown(false);
      }
    }
  }, [shouldGoDown, setGoDown]);

  const [socket] = useSocket();
  useEffect(() => {
    socket?.on('receiveMessage', (data) => {
      console.log('data', data);
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
        newLastPage.push(data);
        newMessages.pages[newMessages.pages.length - 1] = newLastPage;
        queryClient.setQueryData(['rooms', {senderId: session?.user?.email, receiverId: id}, 'messages'], newMessages);
        setGoDown(true);
      }
    });
    return () => {
      socket?.off('receiveMessage');
    }
  }, [socket]);

  return (
    <style.ChatInfo>
      <style.ChatContent ref={listRef}>
        {!adjustingScroll && pageRendered && <div ref={ref} style={{height: 1}}/>}
        {messages?.pages?.map((page) =>
          page.map((m) => {
            if (m.senderId === session?.user?.email) { // 내 메시지
              return (
                <style.Message key={m.messageId} className="myMessage">
                  <style.MessageContent>{m.content}</style.MessageContent>
                  <P styleProps={{ size: 'xsmall' }}>{dayjs(m.createdAt).format('YYYY년 MM월 DD일 A HH시 mm분')}</P>
                </style.Message>
              )
            }
            return (
              <style.Message key={m.messageId} className="yourMessage">
                <style.MessageContent>{m.content}</style.MessageContent>
                <P styleProps={{ size: 'xsmall' }}>{dayjs(m.createdAt).format('YYYY년 MM월 DD일 A HH시 mm분')}</P>
              </style.Message>
            )
          })
        )}
      </style.ChatContent>
    </style.ChatInfo>
  )
}