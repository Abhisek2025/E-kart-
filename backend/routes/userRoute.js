import express from "express";
import { login, register ,reVerify,verify,logout, forgotPassword, verifyOTP, changePassword, allUser, getUserById} from "../controllers/userController.js";
import { isAuthenticated, isAdmin } from "../middleware/isAuthenticated.js";


const router= express.Router();

router.post('/register', register);
router.post('/verify', verify);
router.post('/reverify', reVerify);
router.post('/login', login);
router.post('/logout',isAuthenticated, logout);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/change-password', changePassword);
router.get('/all-user',isAuthenticated,isAdmin, allUser);
router.get("/get-user/:userId", getUserById);


export default router;

