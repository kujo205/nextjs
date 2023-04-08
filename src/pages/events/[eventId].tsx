import { useRouter } from "next/router";
import { getEventById } from "../../../data/dummy-data";
import EventSummary from "../../components/events/event-detail/event-summary";
import EventLogistics from "../../components/events/event-detail/event-logistics";
import EventContent from "../../components/events/event-detail/event-content";
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { DummyEvent } from "../../../data/dummy-data";
import { fetchAll } from '@/utils/fetchAllEvents';

export default function Event({event}:InferGetStaticPropsType<typeof getStaticProps>) {
 
  if (!event) return <p>No event found!</p>;

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

export const getStaticProps:GetStaticProps<{event:DummyEvent}>= async(context)=>{
  const id=context.params?.eventId;


  const rawData=await fetch(`https://nextjs-d36f3-default-rtdb.firebaseio.com/events/${id}.json`);
  const event=await rawData.json()


  if(!event)
  return {
    notFound:true
  }
  return ({
    props:{
      event
    }
  })
}

export const getStaticPaths=async()=>{
  const events=await fetchAll();

  const paths=events.map(e=>({
    params:{
      eventId:e.id
    }
  }))

  return(
    {
      paths,
      fallback:true
    }
  )
}