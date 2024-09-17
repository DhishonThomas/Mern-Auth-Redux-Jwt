import express from "express";
import { auth } from "../middleware/auth";
import { adminCreate,adminDelete,adminEdit,adminHome,adminLogin,adminRead,adminRouterProtecter,adminUpdate } from "../controllers/adminControllers";


const router=express.Router()

router.get("/home",adminHome)

router.get("/delete/:userId",adminDelete)


// router.post("/register",adminRegister)

router.get("/view/:userId",adminRead)

router.post("/login",adminLogin)

router.get("/me",auth,adminRouterProtecter)

router.get("/adminHome",adminHome)


router.post("/edit",adminUpdate)


router.delete("/delete/:userId",adminDelete)


export default router