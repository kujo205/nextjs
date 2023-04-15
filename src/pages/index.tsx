import Head from "next/head";
import { FormEvent, useCallback, useRef, useState } from "react";

export interface Feedback {
  id:string;
  email: string;
  feedback: string;
}

export const fetchFeedbacks = async (): Promise<Feedback[]> => {
  const rawData = await fetch("/api/feedback");
  const data = await rawData.json();
  return data;
};


export default function Home() {
  const emailInputEl = useRef<HTMLInputElement>(null);
  const feedbackEl = useRef<HTMLTextAreaElement>(null);

  const [feedbacks, setFeedbacks] = useState<Feedback[] | null>(null);

  const sumbitHandler = useCallback((ev: FormEvent) => {
    ev.preventDefault();

    const body = {
      email: emailInputEl.current?.value,
      feedback: feedbackEl.current?.value,
    };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((data) => alert(data.message));
  }, []);



  const handleDataFetching = async (ev: React.MouseEvent) => {
    const data = await fetchFeedbacks();
    setFeedbacks(data);
  };

  return (
    <>
      <Head>
        <title>Home page</title>
      </Head>
      <h1>The home page</h1>
      <form action="post" onSubmit={sumbitHandler}>
        <div>
          <label htmlFor="email">Enter your email</label>
          <input type="text" id="email" ref={emailInputEl} />
        </div>
        <div>
          <label htmlFor="feedback">feedback</label>
          <textarea name="" id="feedback" rows={5} ref={feedbackEl}></textarea>
        </div>
        <button type="submit">Submit my feedback</button>
      </form>
      <hr />
      <button onClick={handleDataFetching}>Get Data</button>
      {feedbacks&&<ul>
        {feedbacks.map(feedback=><li key={feedback.id}>
          <h4>
            email:{feedback.email}
          </h4>
          <p>
            {feedback.feedback}
          </p>

        </li>)}
      </ul>}
    </>
  );
}
