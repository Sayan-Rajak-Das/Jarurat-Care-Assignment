import express from "express";
import { createUser, getAllUser, getUser, updateUser, deleteUser } from "../controllers/crud.controller.js";
import { protectedRoute, protectedRouteAdmin } from "../middleware/auth.middlewear.js";

const router = express.Router();


router.post("/create", protectedRouteAdmin, createUser); 

router.get("/all", protectedRoute, getAllUser); 

router.get("/byId/:id", protectedRoute, getUser); 

router.put("/update/:id", protectedRouteAdmin, updateUser); 
 
router.delete("/delete/:id", protectedRouteAdmin, deleteUser);  

export default router;
