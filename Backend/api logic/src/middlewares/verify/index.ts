import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
interface ExtendedRequest extends Request {
  info?: {};
}

export default async function verify(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const bearer = req.headers["authorization"];
    if (!bearer || !bearer.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Log in first" });
    }
    const token = bearer.split(" ")[1];

    const decodedData = await jwt.verify(
      token,
      process.env.SECRET_KEY as string
    );
    req.info = decodedData;

    next();
  } catch (error) {
    let message = error || "An error occured try again later";
    return res.status(401).json({ message });
  }
}
