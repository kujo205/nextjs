import {getAllEvents, getFeaturedEvents} from '../../../data/dummy-data';
import {EventsList} from '../../components/events/EventsList';
import {SearchForm} from '../../components/events/EventsSeacrh';
import { useRouter } from 'next/router';
import type { GetStaticProps,GetStaticPropsResult,InferGetStaticPropsType } from 'next';
import { DummyEvent } from '../../../data/dummy-data';
import { fetchAll } from '@/utils/fetchAllEvents';
import Head from 'next/head';

export default function Events({events}:InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter();


    const submitHandler=(year:number,month:number)=>{
        router.push(`/events/${year}/${month}`)
    }


  return (
    <>
    <Head>
      <title>
        All events
      </title>
      <meta name='description' content='This is a page with all the events components'/>

    </Head>
    <SearchForm onSubmit={submitHandler}/>
     <EventsList events={events}/>
    </>
  )
}


export const getStaticProps:GetStaticProps<{events:DummyEvent[]}>=async ()=>{
  const events=await fetchAll();
  return ({
    props:{
      events
    },
    revalidate:25
  })


}

