import express from 'express'
import mongoose,{ConnectOptions} from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import userRoutes from '../src/routes/userRoutes'

import dotenv from 'dotenv'
dotenv.config()

const app=express()

app.use(bodyParser.json())
app.use(cors())   

app.use("/api",userRoutes)


mongoose.connect('mongodb://localhost:27017/mern-jwt-auth', {
    serverSelectionTimeoutMS: 10000,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.log(err));




const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});