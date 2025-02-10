import Home from '@/app/(afterLogin)/home/page';
import PhotoModal from '@/app/(afterLogin)/@modal/(.)[username]/status/[id]/photo/[photoId]/page';

type Props = { 
  params: Promise<{ id: string, username: string, photoId: string }> 
};
export default function Page({ params }: Props){
  return (
    <>
      <Home />
      <PhotoModal params={params} />
    </>
  )
}