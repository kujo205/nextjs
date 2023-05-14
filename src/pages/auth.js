import AuthForm from '../components/auth/auth-form';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
function AuthPage() {
  const router = useRouter();

  useEffect(()=>{
    getSession().then(session=>{
      if(session){
        router.replace('/')
      }
    })


  },[])

  return <AuthForm />;
}

export default AuthPage;