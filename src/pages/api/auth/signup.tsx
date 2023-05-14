import {encryptPassword} from "../../../../lib/auth";
import { NextApiHandler } from "next";
import { connectToDb } from "../../../../lib/db";
const handler:NextApiHandler=async (req,res)=>{
    if(req.method==="GET"){

    }
    if(req.method==="POST"){
        const data=req.body;

        const {email,password}:{[key:string]:string}=data;

        if(!email||!email.includes('@')||!password||password.trim().length<7){
            res.status(422).json({message:"Invalid Input"})
            return;
        }

        const hashedPwd=await encryptPassword(password);

        const db=await connectToDb();


        const foundEmail=await db?.collection("users").findOne({email});

        if(!foundEmail){
            const id = await db?.collection("users").insertOne({
                email:email,
                password:hashedPwd
            });
            res.status(201).json({message:"Created user"});
        }else{
            res.status(422).json({message:"User with sych an email already exist"});
        }


        

    }


}
export default handler;