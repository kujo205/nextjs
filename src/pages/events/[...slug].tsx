import { useRouter } from "next/router";
import { EventsList } from "@/components/events/EventsList";
import ResultsTitle from "@/components/results-title/results-title";
import { Fragment } from "react";
import type { GetServerSideProps,InferGetServerSidePropsType } from "next";
import { DummyEvent } from "../../../data/dummy-data";
import {getFilteredEvents,dateFilter} from '@/utils/fetchAllEvents';
import Link from "next/link";


export default function Event({events,filterObj,hasError}:InferGetServerSidePropsType<typeof getServerSideProps>) {

  if (hasError||!filterObj||!events) {
    return <p className="center">Something is wrong with your input</p>;
  }
  if(events?.length===0){
    const humanReadableDate = new Date(filterObj.year,filterObj.month-1).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
    
    return <Fragment><p className="center">No events for {(humanReadableDate.toString())}</p>
      <div className="center">
      <Link href={'/events'} className="btn">Back to safety</Link>
      </div>
    
    </Fragment>
  }

  return (
    <Fragment>
      <ResultsTitle date={new Date(filterObj.year,filterObj.month-1)}/>
      <EventsList events={events} />
    </Fragment>
  );
}


export const getServerSideProps:GetServerSideProps<{events?:DummyEvent[],filterObj?:dateFilter,hasError:boolean}>=async (context)=>{
  const slug=context?.query?.slug as string[];

  const filterObj:dateFilter = {
    year: +slug[0],
    month: +slug[1],
  };

  const events=await getFilteredEvents(filterObj)
   
  if(isNaN(filterObj.month) 
  || isNaN(filterObj.year)
  || filterObj.year<2020
  || filterObj.year>2030
  || filterObj.month<1
  || filterObj.month>12
  )
  return({
    props:{
      hasError:true
    }
  });

  return({
    props:{
      events,
      filterObj,
      hasError:false
    }
  })


}