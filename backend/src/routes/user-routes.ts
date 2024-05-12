import { Router } from "express";
import { getAllUsers } from "../controllers/user-controller.js";


const userRoutes=Router();

userRoutes.use("/",getAllUsers);

export default userRoutes;