import { Request, Response} from 'express'

export const addClient = async(req:Request, res:Response)=>{
    const {name, email, location } = req.body
    console.log(name,email)
    res.send("done")
   
} 
export const updateClientDetails = (req:Request, res:Response)=>{
    res.send('the app')
} 

export const removeClient = (req:Request, res:Response)=>{
    res.send('the app')
} 