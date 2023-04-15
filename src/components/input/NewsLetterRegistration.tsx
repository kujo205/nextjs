import { FC, FormEvent, useCallback,useRef } from "react"
import classes from './NewsLetterRegistration.module.scss';
interface NewsLetterRegistrationProps{

}



export const NewsLetterRegistration:FC<NewsLetterRegistrationProps>=({})=>{

    const registrationHandler=useCallback((event:FormEvent)=>{
        event.preventDefault();
        const email=inputRef.current?.value;
        fetch('/api/signup',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({email})
        })
        .then(res=>res.json())
        .then(data=>console.log(data?.message))

    },[])

    const inputRef=useRef<HTMLInputElement>(null) 

    return(
        <section className={classes.registration}>
            <form onSubmit={registrationHandler}>
                <h2>
                    Sign up to stay updated!
                </h2>
                <div className={classes.actions}>
                    <input type="email" className={classes.email} ref={inputRef}/>
                    <input type="submit" value="Register" className='btn-primary'/>
                </div>
            </form>
        </section>
    )

}