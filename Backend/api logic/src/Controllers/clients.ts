import { Request, Response } from "express";
import { db } from "../helpers/dbConnect";
import { v4 as uuidv4 } from "uuid";

export const addClient = async (req: Request, res: Response) => {
  try{
  const { name, email, location } = req.body;
  const user = await db.execute("getclients", { email });
 
  if (user.length > 0)
    return res.status(400).json({ error: "Wrong details entered" });
  let id = uuidv4();
  await db.execute("insertOrUpdateClient", { id, name, email, location });
  res.status(201).json({ message: "client details added successfully" });
  }catch(error){
    let message = error || "An error occured. Please try later"
    res.status(500).json({error:message})
  }
};
export const updateClientDetails = (req: Request, res: Response) => {
  res.send("the app");
};

export const removeClient = (req: Request, res: Response) => {
  res.send("the app");
};
