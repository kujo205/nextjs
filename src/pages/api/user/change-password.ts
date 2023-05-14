import { NextApiHandler } from "next";
import {getSession} from 'next-auth/react';
import {connectToDb} from '../../../../lib/db';
import {verifyPassword} from '../../../../lib/auth';
import { hash } from "bcryptjs";
const handler:NextApiHandler=async(req,res)=>{

    if(req.method!=="PATCH"){
        return;
    }

    console.log(req.cookies)

    const session=await getSession({req});

    // console.log(req.body)

    if(!session){
        res.status(401).json({message:"Not authentificated"})
        return;
    }

    const userEmail=session.user?.email;
    const oldPwd=req.body.oldPasword;
    const newPwd=req.body.newPasword;

    const db=await connectToDb()
    const user=await db?.collection("users").findOne({email:userEmail});
    
    const verified=await verifyPassword(oldPwd,user?.password);

    if(verified){
        try{
            const hashedPwd=await hash(newPwd,12);
            const response=await db?.collection("users").updateOne({email:userEmail},{$set:{password:hashedPwd}})
            res.status(201).json({message:"Password updated"})
        }catch{
            res.status(500).json({message:"Internal server error"})
        }
    }else{
        res.status(422).json({message:"Wrong password"})
    }
    res.status(200).json({message:"Password updated"})
    
}

export default handler;