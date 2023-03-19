import {Router} from "express"
import { addProject, updateProject, getAllProjects, getOneProject, removeProject } from '../Controllers/projects';
import { validator } from '../middlewares/validator/index';
import { projectSchema } from '../schemas/index';

const projectRouter = Router()

projectRouter.get("/", getAllProjects)
projectRouter.get("/:id", getOneProject)
projectRouter.post("/", validator(projectSchema), addProject)
projectRouter.put("/:id", validator(projectSchema), updateProject)
projectRouter.delete("/:id", removeProject)
export default projectRouter