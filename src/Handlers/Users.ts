import express, {Request, Response} from "express"
import User from "../Models/UserModel"

export const saveUser = async (req:Request, res:Response) => {
    const reqBody = req.body    
    // Checking if user already exists
    const userExists = await User.findOne({email: reqBody.email})
    if(userExists){
        return res.send({message: "User already exists"});
    }
    // If user does not exists than create one
    const userInfo = {
        email: reqBody.email,
        displayName: reqBody.displayName || "",
        photoURL: reqBody.photoURL || "",
        role:"USER",
    }
    const user = new User(userInfo)
    const saveUserREs = await user.save();
    
    return res.send(saveUserREs);
}