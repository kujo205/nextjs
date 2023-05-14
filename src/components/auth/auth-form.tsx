
import { useState,useRef } from 'react';
import classes from './auth-form.module.css';
import { FormEvent } from 'react';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/router';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef=useRef<HTMLInputElement>(null);
  const passwordRef=useRef<HTMLInputElement>(null);

  const router=useRouter();

  const onSubmitHandler=async (event:FormEvent)=>{
    event.preventDefault();

    const password=passwordRef.current?.value;
    const email=emailRef.current?.value;

    if(isLogin){
      const result = await signIn('credentials',{redirect:false,email,password})
      
      if(!result?.error){
        router.replace('/profile');
      }


    }else{

      try{
        const response=await fetch('/api/auth/signup',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({password,email})
        });
  
        const parsedResponse=await response.json();
        console.log(parsedResponse.message);
        if(response.ok)(event.target as HTMLFormElement).reset();
  
      }catch(err){
        console.log(err);
      }
    }
    

  }

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required  ref={passwordRef}/>
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>)
}

export default AuthForm;