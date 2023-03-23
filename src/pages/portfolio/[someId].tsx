import { useRouter } from "next/router";

export default function SomeIdPage() {
    const router = useRouter();


    console.log(router);
    console.log(router.pathname);
    for(const query in router.query)console.log(query);


    return <div>
      <h2>Some Id Page</h2>
    </div>;
  }