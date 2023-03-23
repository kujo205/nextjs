import { useRouter } from "next/router";

export default function Client() {

    const router = useRouter();
    
    return <div>
      <h2>{`This is a ${router.query?.clientId}\'s page with ${router.query?.projectId} project`}</h2>
    </div>;
  }
  