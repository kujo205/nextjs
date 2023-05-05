// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

interface reqData {
  email: string;
  name: string;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, name, message }: reqData = req.body;
    if (
      !email ||
      !name ||
      !message ||
      email.trim() === "" ||
      name.trim() === "" ||
      message.trim() === "" ||
      !email.includes("@") ||
      name.length < 3
    ) {
      res.status(422).json({ message: "invalid input" });
      return;
    } else {
      // send info to the db
      const newMessage = {
        name,
        email,
        message,
      };

      const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.yx48dmp.mongodb.net/my-site`;

      console.log(url);

      let client;
      try {
        client = await MongoClient.connect(url);
      } catch (err) {
        res.status(500).json({ message: "Cannot connect to db" });
        return;
      }

      const db = client.db();
      let result;
      try {
        result = await db.collection("messages").insertOne(newMessage);
      } catch (err) {
        client.close();
        res.status(500).json({ message: "internal server error" });
        return;
      }

      res
        .status(201)
        .json({ newMessage, message: "Message sent", id: result.insertedId });

      client.close();
    }
  }

  if (req.method === "GET") {
    res.status(200).json({ name: "John Doe" });
  }
}
