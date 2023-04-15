import type { GetServerSideProps,InferGetServerSidePropsType } from "next";
import { Feedback } from "..";
import {fetchFeedback} from '../api/[feedbackId]';

export default function SpecificFeedBack({feedback}:InferGetServerSidePropsType<typeof getServerSideProps>){
    if(feedback)
    return(
        <div>
            <h3>Email is {feedback.email}</h3>
            <p>Feedback is {feedback.feedback}</p>
        </div>
    );
        else{
            return(<p>
                No feedback was found
            </p>)
        }
}

export const getServerSideProps:GetServerSideProps<{feedback:Feedback|null|undefined}>=async(context)=>{
    let feedback;
    try{
        const id=context.params?.feedbackId;
        feedback=await fetchFeedback(id as string);
    }catch(error){
        feedback=null;
    }


    return ({
        props:{
            feedback
        }
    })



}