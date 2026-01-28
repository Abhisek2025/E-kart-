import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js"

dotenv.config();
connectDB();
const app= express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());

//user Api
app.use('/api/v1/user', userRoute);




app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
});

