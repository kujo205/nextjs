import {getAllEvents, getFeaturedEvents} from '../../../data/dummy-data';
import {EventsList} from '../../components/events/EventsList';
import {SearchForm} from '../../components/events/EventsSeacrh';
import { useRouter } from 'next/router';
import type { GetStaticProps,GetStaticPropsResult,InferGetStaticPropsType } from 'next';
import { DummyEvent } from '../../../data/dummy-data';


export default function Events({events}:InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter();


    const submitHandler=(year:number,month:number)=>{
        router.push(`/events/${year}/${month}`)
    }


  return (
    <>
    <SearchForm onSubmit={submitHandler}/>
     <EventsList events={events}/>
    </>
  )
}


export const getStaticProps:GetStaticProps<{events:DummyEvent[]}>=async ()=>{
  const events=[];
  try{
    const rowData=await fetch('https://nextjs-d36f3-default-rtdb.firebaseio.com/events.json');
    const data= await rowData.json() as {[id:string]:DummyEvent};


    for (const event in data)events.push(data[event]);
  }catch(err){
    console.error(err)
  }
  

  return ({
    props:{
      events
    },
    revalidate:25
  })


}

