import express from 'express'
import {login, register, routePotecter,op} from '../controllers/userControllers'
import { auth } from '../middleware/auth'
const router=express.Router()

router.get("/op",op)

router.post("/register",register)

router.post("/login",login)

router.get("/me",auth,routePotecter)

export default router