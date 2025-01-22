import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const createUser = async (req, res)=>{
    const { fullName, email, password, role } = req.body;

    if(!fullName || !email || !password || !role){
        return res.status(400).json({message: "ALl fields are required"});
    }

    if(password.length < 6){
        return res.status(400).json({message: "Password must be at least 6 characters"});
    }

    try{        
        const user = await User.findOne({email});

        if (user) return res.status(400).json({message: "user exists!"});
        //  hash passwords
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);
        const new_user = new User({
            email,
            fullName,
            role,
            password: hashed_password
        })

        if(new_user){
            await new_user.save();

            res.status(201).json({
                _id: new_user._id,
                fullName: new_user.fullName,
                email: new_user.email,
                role: new_user.role
            });
        }else{
            res.status(400).json({message: "Invalid user data"});
        }        
    }catch(error){
        console.log("Error in signup controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getAllUser = async (req, res)=>{
    try{
        const users = await User.find().select("-password"); // Exclude password from the results
        res.status(200).json(users);
    }catch(error){
        console.log("Error in signup controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getUser = async (req, res)=>{
    try{
        const userId = req.params.id;

        const user = await User.findById(userId).select("-password");
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }    
        res.status(200).json(user);
    }catch(error){
        console.log("Error in signup controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const updateUser = async (req, res)=>{
    try{
        const {fullName, email, role} = req.body;
        const userId = req.params.id;

        if(!fullName || !email || !role){
            return res.status(400).json({message:"All fields are required"});
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { fullName, email, role },
            {new: true} // return new updated user instead of the old record
        );

        res.status(200).json(updatedUser);

    }catch(error){
        console.log("Error in auth controller while uploading picture", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const deleteUser = async (req, res)=>{
    try{
        const userId = req.params.id;

        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
          return res.status(404).json({ message: "User not found" });
        }
    
        res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    }catch(error){
        console.log("Error in signup controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}
