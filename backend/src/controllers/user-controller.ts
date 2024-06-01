import { NextFunction,Request,Response } from "express"
import User from "../models/User.js"
import { hash,compare } from 'bcrypt';
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers =async(
    req:Request,
    res:Response,
    next:NextFunction
) =>{
   try{
    const users = await User.find();
    return res.status(200).json({message:"ok",users});
   }catch(error)
   {
    console.log(error);
    return res.status(200).json({message:"error",cause:error.messsage});
   }
};
export const userSignup =async(
    req:Request,
    res:Response,
    next:NextFunction
) =>{
   try{
    const {name,email,password}=req.body;
    const existingUser =await User.findOne({email});
    if(existingUser) return res.status(401).send("user already exists");
    const hashedpassword=await hash(password,10);
    const user=new User({name,email,password: hashedpassword});
    await user.save();
    //creating and storing tokens
    res.clearCookie(COOKIE_NAME,{
        httpOnly:true,
        domain:"localhost",
        signed:true,
        path:"/",
    });
    const token=createToken(user._id.toString(),user.email,"1d");
    const expires=new Date();
    expires.setDate(expires.getDate()+1);
    res.cookie(COOKIE_NAME,token,{path:"/",domain:"localhost",expires,httpOnly:true,signed:true});
    return res.status(201).json({message:"ok",name:user.name,email:user.email});
   }catch(error)
   {
    console.log(error);
    return res.status(200).json({message:"error",cause:error.messsage});
   }
};

export const userLogin =async(
    req:Request,
    res:Response,
    next:NextFunction
) =>{
   try{
    const {email,password}=req.body;
    const user =await User.findOne({email});
    if(!user){
        return res.status(401).send("user not found");
    }
    const isPasswordCorrect =await compare(password,user.password);
    if(!isPasswordCorrect){
        return res.status(403).send("Incorrect Password");
    }
    res.clearCookie(COOKIE_NAME,{
        httpOnly:true,
        domain:"localhost",
        signed:true,
        path:"/",
    });
    const token=createToken(user._id.toString(),user.email,"7d");
    const expires=new Date();
    expires.setDate(expires.getDate()+1);
    res.cookie(COOKIE_NAME,token,{path:"/",domain:"localhost",expires,httpOnly:true,signed:true});
    return res.status(200).json({message:"ok",name:user.name,email:user.email});
   }catch(error)
   {
    console.log(error);
    return res.status(200).json({message:"error",cause:error.messsage});
   }
};

export const verifyUser =async(
    req:Request,
    res:Response,
    next:NextFunction
) =>{
   try{
    
    const user =await User.findById(res.locals.jwtData.id);
    if(!user){
        return res.status(401).send("user not registered or Token malfunctioned");
    }
    console.log(user._id.toString(),res.locals.jwtData.id);
    if(user._id.toString()!==res.locals.jwtData.id){
        return res.status(401).send("permissions didnot match");
    }

    return res.status(200).json({message:"ok",name:user.name,email:user.email});
   }catch(error)
   {
    console.log(error);
    return res.status(200).json({message:"error",cause:error.messsage});
   }
};
