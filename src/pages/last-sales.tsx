import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { useEffect, useState } from "react";
import useSWR from "swr";
const url = "https://nextjs-d36f3-default-rtdb.firebaseio.com/sales.json";

interface Sale {
  username: string;
  volume: number;
}

export default function SalesPage({
  sales: prop_sales,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [sales, setSales] = useState<Sale[] | null>(prop_sales);
  const { isLoading, data, error } = useSWR(url, (url) =>
    fetch(url).then((data) => data.json())
  );

  useEffect(() => {
    if (data) {
      const sales = [];
      for (const sale in data) sales.push(data[sale]);
      setSales(sales);
    }
  }, [data]);

  // const [isLoading,setIsLoading] = useState<boolean>(false);

  // useEffect(()=>{
  //     (async ()=>{
  //         setIsLoading(true);
  //         try{
  //             const response = await fetch(url);
  //             const data = await response.json();
  //             const sales=[];

  //             for(const sale in data)sales.push(data[sale]);

  //             setSales(sales as unknown as Sale[]);
  //             setIsLoading(false);
  //         }catch(error){
  //             console.log((error as Error).message);
  //         }
  //     })()
  // },[])

  if (error) {
    return <p>Error...</p>;
  }

  return (
    <ul>
      {sales &&
        sales.map((sale) => (
          <li key={Math.random()}>
            <h2>{sale.username}</h2>
            <p>{sale.volume}</p>
          </li>
        ))}
    </ul>
  );
}

export const getStaticProps: GetStaticProps<{ sales: Sale[] }> = async () => {
  const sales = [];
  try {
    const response = await fetch(url);
    const data = await response.json();
    for (const sale in data) sales.push(data[sale]);
  } catch (error) {
    console.log((error as Error).message);
  }

  return {
    props: {
      sales,
    },
  };
};
