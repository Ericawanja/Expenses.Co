import { Request, Response, RequestHandler } from "express";
import { db } from "../helpers/dbConnect";
import { v4 as uuidv4 } from "uuid";

interface ExtendedRequest extends Request {
  info?: any;
}

export const getAllClients: RequestHandler = async (req, res) => {
  try {
    let clients = await db.execute("getAllClients");
    return res.status(200).json({ data: clients });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getOneClient: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    let client = await db.execute("getOneClient", { id });
    if (client.length === 0)
      return res.status(404).json({ error: "Client not found" });
    return res.status(200).json({ data: client });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

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
    let loggedUser = req.info;
    console.log(loggedUser);
    if (!loggedUser.isAdmin)
      return res.status(401).json({ message: "You cannot add a client" });

    const { id } = req.params;

    const { name, email, location } = req.body;
    const user = await db.execute("getclients", { id });

    if (user.length === 0)
      return res.status(400).json({ error: "Wrong details entered" });
    await db.execute("insertOrUpdateClient", { id, name, email, location });

    res.status(201).json({ message: "client updated successfully" });
  } catch (error) {
    console.log(error);
    let message = error || "An error occured. Please try later";
    res.status(500).json({ error: message });
  }
};

export const removeClient = async (req: ExtendedRequest, res: Response) => {
  try {
    let loggedUser = req.info;

    if (!loggedUser.isAdmin)
      return res.status(401).json({ message: "You cannot add a client" });

    const { id } = req.params;

    const user = await db.execute("getclients", { id });

    if (user.length === 0)
      return res.status(400).json({ error: "Wrong details entered" });
    await db.execute("removeClient", { id });

    return res
      .status(200)
      .json({ message: "You have successfully removed the client" });
  } catch (error) {
    console.log(error);
    let message = error || "An error occured. Please try later";
    res.status(500).json({ error: message });
  }
};
