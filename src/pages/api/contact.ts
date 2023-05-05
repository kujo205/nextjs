// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   name: string;
// };

interface reqData {
  email: string;
  name: string;
  message: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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


      console.log(newMessage);


      res.status(201).json({newMessage,message:'Message sent'});
    }
  }

  if (req.method === "GET") {
    res.status(200).json({ name: "John Doe" });
  }
}
