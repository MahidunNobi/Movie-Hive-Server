import { Request, Response } from "express"


export const postMovie = async(req:Request, res:Response)=>{
    const movie = req.body
    const cookie = req.cookies
    console.log(cookie)

    return res.send({message: "Movie added successfully", success: true})
}