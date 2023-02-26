import express, {Request, Response} from 'express'

export const register = (req:Request, res:Response)=>{
    res.status(200).json({msg:'setting up the server'})
}