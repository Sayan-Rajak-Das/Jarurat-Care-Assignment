import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


export const protectedRoute = async (req, res, next)=>{ // call next thing
    try{    
        const token  = req.cookies.jwt;
        
        if(!token){
            return res.status(401).json({message: "Unauthotized - No token provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({message: "Unauthotized - Invalid Token"})
        }

        const user = await User.findById(decoded.userId).select("-password"); // select everything except password; dont want to send password back to client

        if(!user){
            return  res.status(404).json({message: "User not found"});
        }
        req.user = user;
        
        next();
    }catch(error){
        console.log("Error in auth auth middlewear ", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const protectedRouteAdmin = async(req, res, next)=>{
    try{    
        const token  = req.cookies.jwt;
        
        if(!token){
            return res.status(401).json({message: "Unauthotized - No token provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({message: "Unauthotized - Invalid Token"})
        }

        const user = await User.findById(decoded.userId).select("-password"); // select everything except password; dont want to send password back to client

        if(!user){
            return  res.status(404).json({message: "User not found"});
        }

        if (user.role !== "admin") {
            return res.status(403).json({ message: "Forbidden - Admin access required" });
        }
        req.user = user;
        
        next();
        
    }catch(error){
        console.log("Error in auth auth middlewear ", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}