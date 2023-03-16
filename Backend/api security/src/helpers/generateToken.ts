import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

interface payload {
  email: string;
  id?: string;
  isAdmin?: string | number;
}

export const generateToken = (payload: payload) => {
  console.log(payload)
  return jwt.sign(payload, process.env.SECRET_KEY as string, {
    expiresIn: "24h",
  });
};
