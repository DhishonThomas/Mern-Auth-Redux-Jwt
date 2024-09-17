import express from 'express'
import {login, register, routePotecter,op,updateProfile} from '../controllers/userControllers'
import { auth } from '../middleware/auth'

const router=express.Router()

router.get("/op",op)

router.post("/register",register)

router.post("/login",login)

router.get("/me",auth,routePotecter)

router.post("/updateProfile", updateProfile)

export default router 