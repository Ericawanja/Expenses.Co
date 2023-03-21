import express, {Application, json, Request, Response} from 'express'
import clientsRoutes from './Routers/clients';
import projectRoutes from './Routers/projects';
import expensesRouter from './Routers/expenses';
import invoiceRouter from './Routers/invoices';


const app:Application = express()
app.use(json())

app.use ('/clients', clientsRoutes )
app.use ('/projects', projectRoutes )
app.use("/expenses", expensesRouter)
app.use("/invoices", invoiceRouter)
app.listen(4500, ()=>console.log('app running'))