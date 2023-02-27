import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../helpers/dbConnect";
import { v4 as uuidv4 } from "uuid";

interface registerRequest extends Request {
  body: {
    id: string;
    fullname: string;
    password: string;
    email: string;
    isAdmin: Boolean;
  };
}

interface loginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export const register = async (req: registerRequest, res: Response) => {
  let { fullname, email, password, isAdmin = false } = req.body;
  try {
    let exists =
      (await db.execute("getUSer", { email })).length === 0 ? false : true;

    if (exists)
      return res.status(400).json({ error: "Wrong registration details" });

    let hashedPassword = await bcrypt.hash(password, 8);
    let id = uuidv4();
    await db.execute("registerOrUpdateUser", {
      id,
      fullname,
      email,
      password: hashedPassword,
      isAdmin: isAdmin,
    });
    res.status(200).json({ message: "user added succesfully" });
  } catch (error) {
    let message = error || "Try again later can't process the request now";
    res.status(500).json({ error: message });
  }
};
