import React, { FC, FormEvent, useRef, useState } from "react";
import classes from "./ContactsForm.module.css";
import { Notification } from "@/components/ui/notification";

export const ContactsForms = ({}) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [requestStatus, setRequestStatus] = useState<
    "pending" | "success" | "error" | null
  >(null);
  const [message, setMessage] = useState<null | string>(null);

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const newMessage = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      message: messageRef.current?.value,
    };

    setRequestStatus("pending");

    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    })
      .then((response) => {
        if (response.ok) {
          setRequestStatus("success");
          (event.target as HTMLFormElement).reset();
        } else {
          setRequestStatus("error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
        setMessage(data.message);
        setTimeout(() => {
          setRequestStatus(null);
        }, 3000);
      })
  };

  return (
    <>
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
            <label htmlFor="message">Your Message</label>
            <textarea id="message" rows={5} ref={messageRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button>Send Message</button>
          </div>
        </form>
        {requestStatus && (
          <Notification
            message={message}
            status={requestStatus}
            title={requestStatus}
          />
        )}
      </section>
    </>
  );
};
