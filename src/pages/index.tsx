import {DummyEvent} from '../../data/dummy-data';
import {EventsList} from '../components/events/EventsList';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';


export default function Home({featuredEvents}:InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <>
     <EventsList events={featuredEvents}/>
     <div></div>
    </>
  )
}


export const getStaticProps:GetStaticProps<{featuredEvents:DummyEvent[]}>= async ()=>{
  let featuredEvents=[];
  try{
    const rowData=await fetch('https://nextjs-d36f3-default-rtdb.firebaseio.com/events.json');

    const data = (await rowData.json()) as {[id:string]:DummyEvent};

    for (const event in data){
      if(data[event].isFeatured)
      featuredEvents.push(data[event])
    }
  }catch(er){
    console.error(er);
  }

  return ({
    props:{
      featuredEvents
    },
    revalidate:100
  })
    

}