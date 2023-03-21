import {Router} from "express"
import { addProject, updateProject, getAllProjects, getOneProject, removeProject, deliverProject, markProjectPaid} from '../Controllers/projects';
import adminVerification from "../middlewares/adminVerification";
import { validator } from '../middlewares/validator/index';
import { projectSchema } from '../schemas/index';

const projectRouter = Router()

projectRouter.get("/", adminVerification, getAllProjects)
projectRouter.get("/:id", adminVerification, getOneProject)
projectRouter.post("/", adminVerification, validator(projectSchema), addProject)
projectRouter.put("/:id", adminVerification, validator(projectSchema), updateProject)
projectRouter.delete("/:id", adminVerification,  removeProject)
projectRouter.put("/:id/payment", adminVerification, markProjectPaid)



projectRouter.put("/completed/:id", adminVerification, deliverProject)
export default projectRouter