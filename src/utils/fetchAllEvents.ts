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

