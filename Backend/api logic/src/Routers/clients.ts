import {Router} from 'express'
import { addClient, removeClient, updateClientDetails, getAllClients, getOneClient } from '../Controllers/clients';
import verify from '../middlewares/verify/index';

const clientsRoutes = Router()

clientsRoutes.get("/", verify, getAllClients)
clientsRoutes.get("/:id", verify, getOneClient)
clientsRoutes.post("/add", verify, addClient)
clientsRoutes.put("/:id", verify, updateClientDetails)
clientsRoutes.delete("/:id", verify, removeClient)

export default clientsRoutes