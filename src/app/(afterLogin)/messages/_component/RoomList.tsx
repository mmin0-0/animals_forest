'use client';
import { getRooms } from '@/app/(afterLogin)/messages/_lib/getRooms';
import { useQuery } from '@tanstack/react-query';
import { Room as IRoom } from '@/model/Room';
import Room from '@/app/(afterLogin)/messages/_component/Room';
import { useParams } from 'next/navigation';

export default function RoomList(){
  const params = useParams();
  const roomId = params.roomId as string;
  const { data, error } = useQuery<IRoom[], Object, IRoom[], [_1: string, _2: string]>({
    queryKey: ['rooms', roomId], 
    queryFn: getRooms,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if(error){
    return <div>채팅방을 찾을 수 없습니다.</div>
  }

  

  return(
    <>
      {data?.map((room) => <Room key={room.roomId} room={room} />)}
    </>
  )
}