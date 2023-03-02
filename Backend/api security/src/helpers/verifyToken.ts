import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const verifyToken = async(token:string)=>{
    const info = await jwt.verify(token, process.env.SECRET_KEY as string);
    
    return  info
}