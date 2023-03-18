import express, {Application, json, Request, Response} from 'express'
import clientsRoutes from './Routers/clients';
import projectRoutes from './Routers/projects';


const app:Application = express()
app.use(json())

app.use ('/clients', clientsRoutes )
app.use ('/projects', projectRoutes )
app.listen(4500, ()=>console.log('app running'))