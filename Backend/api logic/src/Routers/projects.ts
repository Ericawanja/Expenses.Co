import {Router} from "express"
import { addProject, updateProject, getAllProjects, getOneProject, removeProject } from '../Controllers/projects';

const projectRouter = Router()

projectRouter.get("/", getAllProjects)
projectRouter.get("/:id", getOneProject)
projectRouter.post("/", addProject)
projectRouter.put("/", updateProject)
projectRouter.delete("/:id", removeProject)
export default projectRouter