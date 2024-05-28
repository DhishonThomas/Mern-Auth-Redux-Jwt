import jwt from "jsonwebtoken";
import { Response,Request ,NextFunction} from "express";
import dotenv from 'dotenv'
dotenv.config()

declare global {
    namespace Express {
      interface Request {
        user: any;
      }
    }
  }

export const auth=async(req:Request,res:Response,next:NextFunction)=>{


    const token=req.header('Authorization')?.replace('Bearer ', '');

    if(!token){
        return res.status(401).send("No token")
    }

    try {
        
const decoded=jwt.verify(token,process.env.JWT_SECRET||"secret")
req.user=decoded;

next()
    } catch (error) {
        res.status(500).send("Internal server error")
    }
}