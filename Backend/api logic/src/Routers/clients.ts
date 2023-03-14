import {Router} from 'express'
import { addClient } from '../Controllers/clients'

const clientsRoutes = Router()

clientsRoutes.post("/add", addClient)

export default clientsRoutes