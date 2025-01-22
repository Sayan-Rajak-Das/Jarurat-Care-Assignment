import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; // to prsse cookie
import cors from "cors";

import { connectDB } from "./lib/db.js";
import authRoutes from './routes/auth.route.js';
import crudRoutes from './routes/crud.route.js';


dotenv.config();

const app = express();

// Middlewares
app.use(cors({
    credentials : true,
    origin : "*"
}))
app.use(express.json());
app.use(cookieParser()); 


// Routes
app.use("/api/auth", authRoutes);
app.use("/crud", crudRoutes);


const PORT = process.env.PORT || 5001;

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on port number ${PORT}`);
        connectDB();
    })
})
