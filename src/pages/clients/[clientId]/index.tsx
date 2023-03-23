import { useRouter } from "next/router";

export default function Client() {

    const router = useRouter();

    function onClickHandler(){
      router.push({
        href:'/clients/[clientId]/[projectId]',
        query:{
          clientId:router.query.clientId,
          projectId:'projectA',
         
        }
      })
    }


    return <div>
      <h2>{`This is a ${router.query?.clientId}\'s page`}</h2>

      <button onClick={onClickHandler}>Project!</button>

    </div>;
  }
  