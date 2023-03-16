import { Request, Response } from "express";
import { db } from "../helpers/dbConnect";
import { v4 as uuidv4 } from "uuid";

interface ExtendedRequest extends Request {
  info?: any;
}

export const addClient = async (req: ExtendedRequest, res: Response) => {
  try {
    let loggedUser = req.info;
    if (!loggedUser.isAdmin)
      return res.status(401).json({ message: "You cannot add a client" });

    const { name, email, location } = req.body;
    const user = await db.execute("getclients", { email });

    if (user.length > 0)
      return res.status(400).json({ error: "Wrong details entered" });
    let id = uuidv4();
    await db.execute("insertOrUpdateClient", { id, name, email, location });
    res.status(201).json({ message: "client details added successfully" });
  } catch (error) {
    let message = error || "An error occured. Please try later";
    res.status(500).json({ error: message });
  }
};
export const updateClientDetails = async (
  req: ExtendedRequest,
  res: Response
) => {
  try {
    console.log("updating..")
    let loggedUser = req.info;
    console.log(loggedUser)
    if (!loggedUser.isAdmin)
      return res.status(401).json({ message: "You cannot add a client" });

    const {id} = req.params;
    
    const { name, email, location } = req.body;
    const user = await db.execute("getclients", { id});
    console.log(user);
    if (user.length === 0)
      return res.status(400).json({ error: "Wrong details entered" });
    await db.execute("insertOrUpdateClient", {id,name,email,location})

    res.status(201).json({ message: "client updated successfully" });
  } catch (error) {
    console.log(error)
    let message = error || "An error occured. Please try later";
    res.status(500).json({ error: message });
  }
};

export const removeClient = (req: Request, res: Response) => {
  res.send("the app");
};
