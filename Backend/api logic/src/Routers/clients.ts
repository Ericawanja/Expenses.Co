import {Router} from 'express'
import { addClient, removeClient, updateClientDetails } from '../Controllers/clients';
import verify from '../middlewares/verify/index';

const clientsRoutes = Router()

clientsRoutes.post("/add", verify, addClient)
clientsRoutes.put("/:id", updateClientDetails)
clientsRoutes.delete("/:id", removeClient)

export default clientsRoutes