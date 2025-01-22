import express from "express";
import {login, logout, checkAuth} from "../controllers/auth.controller.js"
import { protectedRoute } from "../middleware/auth.middlewear.js";

const router =  express.Router();



router.post("/login", login);

router.post("/logout", logout);

router.get("/check", protectedRoute, checkAuth);

export default router;