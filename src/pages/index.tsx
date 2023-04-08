import { DummyEvent } from "../../data/dummy-data";
import { EventsList } from "../components/events/EventsList";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

export default function Home({
  featuredEvents,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Home page</title>
        <meta name="description" content="this is my first next js page" />
      </Head>
      <EventsList events={featuredEvents} />
      <div></div>
    </>
  );
}

export const getStaticProps: GetStaticProps<{
  featuredEvents: DummyEvent[];
}> = async () => {
  let featuredEvents = [];
  try {
    const rowData = await fetch(
      "https://nextjs-d36f3-default-rtdb.firebaseio.com/events.json"
    );

    const data = (await rowData.json()) as { [id: string]: DummyEvent };

    for (const event in data) {
      if (data[event].isFeatured) featuredEvents.push(data[event]);
    }
  } catch (er) {
    console.error(er);
  }

  return {
    props: {
      featuredEvents,
    },
    revalidate: 100,
  };
};
