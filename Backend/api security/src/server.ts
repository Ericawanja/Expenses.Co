import express, {Application, Request, Response} from 'express'

const app:Application = express()

app.get ('/', (req:Request, res:Response)=>{
    res.status(200).json({msg:'setting up the server'})
})
app.listen(5000, ()=>console.log('app running'))