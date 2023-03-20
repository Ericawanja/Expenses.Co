import {Router} from "express"
import { getAllProjectExpenses, insertProjectExpenses, updateProjectExpenses, removeProjectExpenses } from '../Controllers/expenses';
import adminVerification from "../middlewares/adminVerification";
import { validator } from '../middlewares/validator/index';
import { expensesSchema } from '../schemas/index';


const expensesRouter = Router()

expensesRouter.get("/",adminVerification, getAllProjectExpenses)
expensesRouter.post("/", adminVerification, validator(expensesSchema), insertProjectExpenses)
expensesRouter.put("/:id", adminVerification, validator(expensesSchema), updateProjectExpenses )
expensesRouter.delete("/:id", adminVerification, removeProjectExpenses)

export default expensesRouter