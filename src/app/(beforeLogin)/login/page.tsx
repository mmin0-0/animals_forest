import Main from '@/app/(beforeLogin)/_component/Main';
import RedirectToLogin from '@/app/(beforeLogin)/login/_component/RedirectToLogin';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  if(session?.user){
    redirect('/home');
    return null;
  }

  return (
    <>
      <RedirectToLogin />
      <Main />
    </>
  )
}