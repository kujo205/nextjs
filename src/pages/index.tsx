import {getFeaturedEvents} from '../../data/dummy-data';
import {EventsList} from '../components/events/EventsList';



export default function Home() {

  const featuredEvents = getFeaturedEvents();

  return (
    <>
     <EventsList events={featuredEvents}/>
    </>
  )
}
