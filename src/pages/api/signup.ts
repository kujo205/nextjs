import { NextApiHandler } from "next";
import { MongoClient } from "mongodb";

export const href=`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.yx48dmp.mongodb.net/database0?retryWrites=true&w=majority`;


const handler: NextApiHandler = async (req, res) => {
    console.log(href)
  if (req.method === "POST") {
    const email = req.body.email as string;
    if (
      email.trim() === "" ||
      !email.includes("@") ||
      email.split("@").some((part) => part.length < 3)
    ) {
      res.status(422).json({ message: "Wrong email type" });
      return;
    }

    const client=await MongoClient.connect(href);
    const db= client.db();
    await db.collection('emails').insertOne({email})
    client.close();


    res.status(200).json({ message: "Email recieved" });
  }
  if (req.method === "GET") {


  }
};

export default handler;
