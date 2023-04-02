import { useEffect, useState } from "react";

interface Sale{username:string,volume:number}

export default function SalesPage(){
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [sales,setSales]=useState<Sale[]|null>(null)

    useEffect(()=>{
        (async ()=>{
            setIsLoading(true);
            try{
                const response = await fetch('https://nextjs-d36f3-default-rtdb.firebaseio.com/sales.json');
                const data = await response.json();
                const sales=[];

                for(const sale in data)sales.push(data[sale]);

                setSales(sales as unknown as Sale[]);
                setIsLoading(false);
            }catch(error){
                console.log((error as Error).message);
            }
        })()
    },[])

    if(isLoading){
        return <p>
            Loading...
        </p>
    }else{
        return (
            <ul>
                    {sales&&sales.map(sale=>
                        <li key={Math.random()}>
                            <h2>
                                {sale.username}
                            </h2>
                            <p>
                                {sale.volume}
                            </p>
                         </li>)}
            </ul>)
    }
    

    
}