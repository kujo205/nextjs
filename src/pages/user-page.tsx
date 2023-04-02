import {GetServerSideProps} from 'next';

interface User{
    [key:string]:string
}


export default function userPage({name}:User){
    return (
        <div>
            <h1>
                {name}
            </h1>
        </div>

    )
}

export const getServerSideProps:GetServerSideProps<User>= async (context)=>{
    const {req,res,params}=context;

    return ({
        props:{
            name:'Max'
        }
    })
}