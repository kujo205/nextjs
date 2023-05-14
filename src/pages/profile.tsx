import UserProfile from '../components/profile/user-profile';
import type { GetServerSideProps,InferGetServerSidePropsType } from 'next';
import {getSession} from 'next-auth/react';

function ProfilePage({session}:InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(session);

  return <UserProfile/>;
}
//@ts-ignore
export const getServerSideProps:GetServerSideProps<{session?:string}>=async(ctx)=>{
  const session=await getSession({req:ctx.req});
  if(!session){
    return{
      redirect:{
        destination:'/',
        permanent:false
      },
      props:{}
    }
  }

    return{
      props:{
        session
      }
    }
  
}

export default ProfilePage;