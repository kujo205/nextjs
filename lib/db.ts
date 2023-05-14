import {MongoClient} from "mongodb";

const url =`mongodb+srv://${process.env.MONGO_CLIENT}:${process.env.MONGO_PASSWORD}@cluster0.yx48dmp.mongodb.net/`


export const connectToDb=async ()=>{
    let db;
    try{
        const client = await MongoClient.connect(url);
        return client.db('08-auth-nextjs');
    }catch{
        console.log("Error connecting to MONGODB");
        db=null
    }
    return db;
}

