import { useRouter } from "next/router"


export default function Event() {
    const router=useRouter();

    if(router.query.slug)
    for(const query of router.query.slug)console.log(query);
    
    return (
      <>
        <h1>Filtered events page</h1>
      </>
    )
  }
  