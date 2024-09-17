import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema({
      email:{
        type:String,
        required:true,
        unique:true
      },
      password: { type: String, 
        required: true }


});

//😃 if use arrow function you can't access to the this value ...

adminSchema.pre('save',async function(next){

    if(!this.isModified('password')){
        return next()
    }

const salt= await bcrypt.genSalt(10)

this.password=await bcrypt.hash(this.password,salt)
next();
} )

export const Admin= mongoose.model('Admin',adminSchema)