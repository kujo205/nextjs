import { Fragment } from "react";
import { Feedback } from "../index";
import {getData} from '../api/feedback';
import type {
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import Link from "next/link";

export default function FeedbackPage({
  feedbacks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Fragment>
      <h1>This is a page with all the feedbacks</h1>
      <ul>
        {feedbacks.map((feedback) => (
          <li key={feedback.id}>
            <p>{feedback.feedback}</p>
            <Link href={`feedback/${feedback.id}`}>
                Show details
            </Link>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export const getStaticProps: GetStaticProps<{ feedbacks: Feedback[] }> = async (
  context
) => {
    const feedbacks=await getData();



  return ({
    props: {
      feedbacks,
    },
    revalidate: 100,
  });
};
