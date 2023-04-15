import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import type { Feedback } from '../../pages/index';

const getFilePath=()=>path.join(process.cwd(), "data", "feedback.json");

export const getData=()=>{
    const filePath = getFilePath();
    const rowData = fs.readFileSync(filePath) as unknown as string;
    const data: Feedback[] = JSON.parse(rowData);
    return data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const filePath=getFilePath();
    const data=getData();

  if (req.method === "POST") {
    console.log(req.body.feedback, req.body.email);
    req.body.id=new Date().toISOString();
    data.push(req.body);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(200).json({ message: "Everything works correct" });
  } else {
    res.status(200).json(data);
  }
}
