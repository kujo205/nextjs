import type {DummyEvent} from '../../data/dummy-data';

export const fetchAll=async():Promise<DummyEvent[]>=>{
    const events=[];
    try{
      const rowData=await fetch('https://nextjs-d36f3-default-rtdb.firebaseio.com/events.json');
      const data= await rowData.json() as {[id:string]:DummyEvent};
    
    
      for (const event in data)events.push(data[event]);
    }catch(err){
      console.error(err)
    }
    return events;
}


export async function getFilteredEvents(dateFilter:dateFilter):Promise<DummyEvent[]> {
    const { year, month } = dateFilter;
  
    const events=await fetchAll();

    let filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });
  
    return filteredEvents;
  }

export interface dateFilter{
    month:number,
    year:number,
}
