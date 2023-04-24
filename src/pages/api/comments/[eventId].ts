import type { NextApiHandler } from "next";
import type { CommentType } from "@/components/input/Comment";
import { MongoClient } from "mongodb";
import { href } from "../signup";

const DUMMY_COMENTS: CommentType[] = [
  {
    author: "author1",
    text: "dummy-text dummy-text dummy-text dummy-text dummy-text",
    name: "name1",
    id: "id1",
  },
  {
    author: "author2",
    text: "dummy-text dummy-text dummy-text dummy-text dummy-text",
    name: "name2",
    id: "id2",
  },
  {
    author: "author3",
    text: "dummy-text dummy-text dummy-text dummy-text dummy-text",
    name: "name3",
    id: "id3",
  },
  {
    author: "author4",
    text: "dummy-text dummy-text dummy-text dummy-text dummy-text",
    name: "name4",
    id: "id4",
  },
];

const handler: NextApiHandler = async (req, res) => {
  const client = await MongoClient.connect(href);
  const db = await client.db();

  if (req.method === "POST") {
    const comment = req.body.comment;
    if (comment) {
      comment.eventId = req.query.eventId;
      db.collection("comments").insertOne({ comment });
      res
        .status(201)
        .json({ message: "Data recieved, everything work fine", comment });
      return;
    }
  }
  if (req.method === "GET") {
    let documnets;
    try {
      documnets = await db
        .collection("comments")
        .find()
        .sort({ _id: -1 })
        .toArray();

      client.close();
    } catch (error) {
      res.status(500).json({ message: "internal error" });
      return;
    }

    res.status(201).json(documnets);
    return;
  }
};

export default handler;
