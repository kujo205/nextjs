import { GetServerSideProps,InferGetServerSidePropsType } from "next";





export const getServerSideProps:GetServerSideProps<{id:string}>=async (context) =>{
    const {params}=context;
    
    const uid= params!.uid as string;

    return ({
        props:{
            id:'user-id '+uid
        }

    })
}

export default function UserIdPage({ id }: InferGetServerSidePropsType<typeof getServerSideProps>){
    return(
        <div>
            {id}
        </div>
    )


}