import { Router } from "express";
import { upload } from "../middlewares/multer.middleware"

const router = Router();

// importing contollers
import { register_user } from "../controllers/user.controllers";


// Routing to the user controllers
router.route("/register").post(
    upload.single("avatar_img"),            // multer middleware
    register_user                           // controller
);                                          // https://localhost:8000/users/register




export default router;