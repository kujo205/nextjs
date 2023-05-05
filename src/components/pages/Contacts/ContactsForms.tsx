import React, { FC, FormEvent, useRef,useState } from "react";
import classes from "./ContactsForm.module.css";

export const ContactsForms: FC<{ onSubmit: (data: object) => void }> = ({
  onSubmit,
}) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [loading,setLoading]=useState(false);
  const [message,setMessage]=useState<null|string>(null);


  const onSubmitHandler = async (evevnt: FormEvent) => {
    evevnt.preventDefault();

    const newMessage = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      message: messageRef.current?.value,
    };

    setLoading(true);

    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(newMessage)
    }).then((response) => {
        setLoading(false);
        return response.json()
    }).then((data) => {
        console.log(data.message);
        setMessage(data.message);
        setTimeout(()=>{
            setMessage(null);
        },5000)
    })
    
  };

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" required ref={nameRef} />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Email</label>
          <textarea id="message" rows={5} ref={messageRef}></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {message&&<p>
        {message}
      </p>}
    </section>
  );
};
