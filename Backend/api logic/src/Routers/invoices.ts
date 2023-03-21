import {Router} from "express"
import { generateAllInvoices } from "../Controllers/invoices";

import adminVerification from "../middlewares/adminVerification";



const invoiceRouter = Router()
invoiceRouter.get("/", adminVerification, generateAllInvoices)


export default invoiceRouter