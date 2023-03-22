import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../helpers/dbConnect";
import { v4 as uuidv4 } from "uuid";
import { generateToken } from "../helpers/generateToken";
import { verifyToken } from "../helpers/verifyToken";

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

interface ILoginBody{
  email: string;
  password: string;

}
interface forgotRequest extends Request {
  body: {
    email: string;
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

export const login = async (req: Request <{}, {}, ILoginBody>, res: Response) => {
  let { email, password } = req.body;
  try {
    let user = await db.execute("getUSer", { email });

    if (user.length === 0)
      return res.status(400).json({ error: "Wrong login details" });
    let isCorrect = await bcrypt.compare(password, user[0].password);
    if (!isCorrect)
      return res.status(400).json({ error: "invalid login creditials" });

    const token = generateToken({
      name:user[0].name,
      email: user[0].email,
      id: user[0].id,
      isAdmin: user[0].isAdmin,
    });
    return res.status(200).json({ status: "succesful login", token });
  } catch (error) {
    let message = error || "Try again later can't process the request now";
    res.status(500).json({ error: message });
  }
};

export const forgot = async (req: forgotRequest, res: Response) => {
  const { email } = req.body;
  try {
    let user = await db.execute("getUSer", { email });
    if (user.length === 0)
      return res.status(400).json({ error: "Wrong login details" });
    const token = generateToken({ email });
    await db.execute("insertResetQUeue", { email, token });
    res
      .status(200)
      .json({ message: "Please check your email for a reset link" });
  } catch (error) {
    let message = error || "Try again later can't process the request now";
    res.status(500).json({ error: message });
  }
};

export const reset = async (req: loginRequest, res: Response) => {
  const { email, password } = req.body;
  try {
    let user = await db.execute("getUSer", { email });
    if (user.length === 0)
      return res.status(400).json({ error: "Wrong login details" });
    let inReset = await db.execute("getFromResetQueue", { email });
    if (inReset.length === 0)
      return res.status(400).json({ error: "An error Occured" });
    let token = inReset[0].token;

    const decodedData = await verifyToken(token);
    if (!decodedData)
      return res.status(400).json({ error: "An error Occured" });

    let hashedPassword = await bcrypt.hash(password, 8);
    await db.execute("resetPassword", { email, password: hashedPassword });
    await db.execute("removeFromResetQueue", { email });
    res.status(200).json({ message: "Login details updated successfully" });
  } catch (error) {
   
    let message = error || "Try again later can't process the request now";
    res.status(500).json({ error: message });
  }
};
