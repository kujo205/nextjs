import {getAllEvents, getFeaturedEvents} from '../../../data/dummy-data';
import {EventsList} from '../../components/events/EventsList';
import {SearchForm} from '../../components/events/EventsSeacrh';
import { useRouter } from 'next/router';


export default function Events() {
    const router = useRouter();

  const allEvents = getAllEvents();
    const submitHandler=(year:number,month:number)=>{
        router.push(`/events/${year}/${month}`)
    }


  return (
    <>
    <SearchForm onSubmit={submitHandler}/>
     <EventsList events={allEvents}/>
    </>
  )
}
