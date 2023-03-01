import { Router } from "express";
import { register, login, forgot } from "../Controllers";
import { validator } from "../midlewares/validator";
import { loginSchema, registerSchema } from "../schemas";


const auth = Router();

auth.post("/register", validator(registerSchema), register);
auth.post("/login", validator(loginSchema), login);
auth.post("/forgot", forgot)

export default auth;
