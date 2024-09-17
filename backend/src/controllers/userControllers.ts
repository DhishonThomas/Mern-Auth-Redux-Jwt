import { Request,Response } from "express"
import {User} from '../models/user'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

declare global {
    namespace Express {
      interface Request {
        user: any;
      }
    }
  }

 export const op=(req:Request,res:Response)=>{
res.send("it is worked")
 }

export const register=async(req:Request,res:Response)=>{

    const {username,email,password}=req.body
try{
console.log(req.body)

const existingUser=await User.findOne({email})

if(existingUser){
    return res.json({existingUser:true,message:"Existing User"})
}
    const user=new User({username,email,password})

   await user.save()
    res.status(201).send("User registerd")
}catch(error){
res.status(401).send("Error registering the user")
}

}

 
export const login=async(req:Request,res:Response)=>{

     const {email,password}=req.body

     try {
        const user=await User.findOne({email})

if(!user){
    return res.json({error:true,message:"Invalid credinials"})
}

    const isMatch=await bcrypt.compare(password,user.password)

    if(!isMatch){
        return res.status(400).send("Invalid credinials")
    }

    const payload={userId:user._id}
    console.log(process.env.JWT_SECRET)
const token=jwt.sign(payload,process.env.JWT_SECRET||"secret",{expiresIn:'1h'})

res.json({token})
     } catch (error) {
        res.status(500).send("Internal server error")
     }
}


export const routePotecter= async (req:Request,res:Response)=>{

    try {
        
        const user=await User.findById(req.user.userId).select('-password')
        res.json(user)
    } catch (error) {
        res.status(500).send("Internal server error")
    }
}

export const updateProfile=async (req:Request,res:Response)=>{

    try {
        const { email, username,imageUrl } = req.body;
     console.log(req.body)

     const user=await User.findOneAndUpdate({email},{
        email:email,
        username:username,
        imageUrl:imageUrl,
     }, { new: true })


     if(!user){
        res.status(401).send("In valid credinials")
     }



res.send({k:"jjjj",user})

    } catch (error) {
                res.status(500).send("Internal server error")

    }
}