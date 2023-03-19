import {Router} from 'express'
import { addClient, removeClient, updateClientDetails, getAllClients, getOneClient } from '../Controllers/clients';
import verify from '../middlewares/verify/index';
import { validator } from '../middlewares/validator/index';
import { clientRegisterSchema } from '../schemas/index';

const clientsRoutes = Router()

clientsRoutes.get("/", verify, getAllClients)
clientsRoutes.get("/:id", verify, getOneClient)
clientsRoutes.post("/", verify, validator(clientRegisterSchema), addClient)
clientsRoutes.put("/:id", verify, validator(clientRegisterSchema), updateClientDetails)
clientsRoutes.delete("/:id", verify, removeClient)

export default clientsRoutes