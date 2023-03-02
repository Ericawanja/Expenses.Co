import { Router } from "express";
import { register, login, forgot, reset } from "../Controllers";
import { validator } from "../midlewares/validator";
import { loginSchema, registerSchema, forgotPasswordSchema  } from "../schemas";



const auth = Router();

auth.post("/register", validator(registerSchema), register);
auth.post("/login", validator(loginSchema), login);
auth.post("/forgot",validator(forgotPasswordSchema), forgot)
auth.post("/reset", validator(loginSchema), reset)

export default auth;
