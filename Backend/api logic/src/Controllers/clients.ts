import {Application, json, Request, Response} from 'express'



export const addClient = (req:Request, res:Response)=>{
    const {name, email, location } = req.body
   res.send('jjj jjj')
} 
export const updateClientDetails = (req:Request, res:Response)=>{
    res.send('the app')
} 

export const removeClient = (req:Request, res:Response)=>{
    res.send('the app')
} 