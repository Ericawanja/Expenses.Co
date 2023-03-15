import {Router} from 'express'
import { addClient, removeClient, updateClientDetails } from '../Controllers/clients';

const clientsRoutes = Router()

clientsRoutes.post("/add", addClient)
clientsRoutes.put("/:id", updateClientDetails)
clientsRoutes.delete("/:id", removeClient)

export default clientsRoutes