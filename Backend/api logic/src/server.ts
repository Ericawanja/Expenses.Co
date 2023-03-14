import express, {Application, json, Request, Response} from 'express'
import clientsRoutes from './Routers/clients';


const app:Application = express()
app.use(json())

app.use ('/clients', clientsRoutes )
app.listen(4500, ()=>console.log('app running'))