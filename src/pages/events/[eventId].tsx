import { useRouter } from "next/router"


export default function Event() {
    const router=useRouter();

    return (
      <>
        <h1>{router.query.eventId}`s event page</h1>
      </>
    )
  }
  