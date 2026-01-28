import { User } from "../models/userModel.js";


export const register= async(req,res)=> {
    try{
        const {firstName,lastName,email,password}=req.body;

        //validation
        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({
             success: false,
             message:'All Fileds are required'  
            });
        }

        //check User exist or not
        const userExists = await User.findOne({email})
        if(userExists){
             return res.status(400).json({
                success: false,
                message:"User Already Exist"
            });
        }
            //Createnew user
            const newUser = await User.create({
                firstName,
                lastName,
                email,
                password
            });
            await newUser.save();
            return res.status(201).json({
                success: true,
                message: "User registered successfully",
                user:newUser
            });
        

        } catch(error){
           return res.status(500).json({
                success: false,
                message:error.message
            });
        }
        };