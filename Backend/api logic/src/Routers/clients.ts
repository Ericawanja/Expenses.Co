import {Router} from 'express'
import { addClient, removeClient, updateClientDetails, getAllClients, getOneClient } from '../Controllers/clients';
import verify from '../middlewares/verify/index';
import { validator } from '../middlewares/validator/index';
import { clientRegisterSchema } from '../schemas/index';
import adminVerification from '../middlewares/adminVerification';

const clientsRoutes = Router()

clientsRoutes.get("/", adminVerification, getAllClients)
clientsRoutes.get("/:id", adminVerification, getOneClient)
clientsRoutes.post("/", adminVerification, validator(clientRegisterSchema), addClient)
clientsRoutes.put("/:id", adminVerification, validator(clientRegisterSchema), updateClientDetails)
clientsRoutes.delete("/:id", adminVerification, removeClient)

export default clientsRoutes