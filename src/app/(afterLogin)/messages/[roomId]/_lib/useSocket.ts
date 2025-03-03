import {useCallback, useEffect} from 'react';
import { io, Socket } from 'socket.io-client';
import {useSession} from "next-auth/react";

let socket: Socket | null;
export default function useSocket(): [Socket | null, () => void] {
  const { data: session } = useSession();
  const disconnect = useCallback(() => {
    socket?.disconnect();
    socket = null;
  }, []);

  useEffect(() => {
    if (!socket) {
      socket = io(`/messages`, {
        transports: ['websocket']
      });
      socket.on('connect_error', (err) => {
        console.error(err);
        console.log(`connect_error due to ${err.message}`);
      })
    }
  }, [session]);

  useEffect(() => {
    if (socket?.connected && session?.user?.email) {
      socket?.emit('login', { id: session?.user?.email });
    }
  }, [session]);

  return [socket, disconnect];
}