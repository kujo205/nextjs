import classes from './profile-form.module.css';
import type { FormEvent } from 'react';
import { useRef } from 'react';
import {useRouter} from 'next/router';

function ProfileForm() {
  const oldPasswordRef=useRef<HTMLInputElement>(null);
  const newPasswordRef=useRef<HTMLInputElement>(null);

  const router=useRouter();
  const handlePasswordChange=async(event:FormEvent)=>{
    event.preventDefault();

    const oldPassword=oldPasswordRef.current?.value;
    const newPassword=newPasswordRef.current?.value;

    const response = await fetch('/api/user/change-password',{
      method:'PATCH',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        newPassword,
        oldPassword
      })
    })
    const parsedResponse=await response.json();

    console.log(parsedResponse);

    if(response.ok){
      router.replace('/');
    }
  }


  return (
    <form className={classes.form} onSubmit={handlePasswordChange}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldPasswordRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;