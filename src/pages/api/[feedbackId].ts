import type { NextApiRequest,NextApiResponse } from "next"
import { getData } from "./feedback";

export const fetchFeedback=async(id:string)=>{
    const data=await getData();
    const specificFeedback= data.find(feedback=>feedback.id==id);
    return specificFeedback
}

const handler = async (req:NextApiRequest,res:NextApiResponse)=>{
    console.log('Im here')
    if(req.method==='GET'){
        const {feedbackId}=req.query;
        try{
            const specificFeedback=fetchFeedback(feedbackId as string)
            if(!specificFeedback)throw new Error()
            res.status(200).json(specificFeedback); 
        }catch(err){
            res.status(404).json({message:'Couldn\'t find a feedback'})
        }    
    }

}
export default handler;