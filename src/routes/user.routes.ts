import { Router } from "express";
const router = Router();

// importing contollers
import { register_user } from "../controllers/user.controllers";


// Routing to the user controllers
router.route("/register").post(register_user);             // localhost:8000/users/register


export default router;