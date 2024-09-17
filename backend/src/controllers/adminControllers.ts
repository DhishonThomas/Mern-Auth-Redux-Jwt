import { Request,Response } from "express";
import { Admin } from "../models/admin";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from "../models/user";



// export const adminRegister=async(req:Request,res:Response)=>{
//     try {
//         const {email,password}=req.body
        
//         const user=new Admin({email,password})

//         await user.save()
//          res.status(201).send("User registerd")
        
//     } catch (error) {
//         res.status(500).send("Internal server error")        

//     }
// }

export const adminLogin=async (req:Request,res:Response)=>{
    const {email,password}=req.body

    try {
       const user=await Admin.findOne({email})

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

export const adminHome=async(req:Request,res:Response)=>{

    try {

const user=await User.find()

res.json({user})
    } catch (error) {
        res.status(500).send("Internal server error")        

    }
}

export const adminRead=async(req:Request,res:Response)=>{

    try {
        const {userId}=req.params

        const user=await User.findById(userId).select('-password')

        console.log(user)
        res.json(user)

    } catch (error) {
        res.status(500).send("Internal server error")        

    }
}


export const adminDelete=async(req:Request,res:Response)=>{
    try {
        
        const {userId}=req.params
const user=await User.findByIdAndDelete(userId)

console.log(user)

res.json("UserDeleted succesfully")

    } catch (error) {
res.status(500).send("Internal server error")        
    }
}

export const adminEdit=async(req:Request,res:Response)=>{

try {
    
} catch (error) {
    
}

}

export const adminUpdate=async (req:Request,res:Response)=>{

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

/////////////////////////////////////////////////////////////////////////////////////
export const adminCreate=async(req:Request,res:Response)=>{
    
    const {username,email,password}=req.body

    try {

const existingUser=await User.findOne({email})

if(existingUser){
    return res.json({existingUser:true,message:"Existing User"})
}

const user=new User({username,email,password})

   await user.save()
    res.status(201).send("User registerd")
        
    } catch (error) {
        res.status(401).send("Error registering the user")

    }
}

export const adminRouterProtecter=async(req:Request,res:Response)=>{
    try {
    
        const user=await Admin.findById(req.user.userId).select('-password')
        res.json(user)
    } catch (error) {
        res.status(500).send("Internal server error")
    }
}