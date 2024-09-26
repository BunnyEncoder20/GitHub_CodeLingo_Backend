import { Router } from "express";
import { upload } from "../middlewares/multer.middleware";
import { verify_user } from "../middlewares/auth.middleware";

const router = Router();

// importing contollers
import { register_user, login_user,logout_user } from "../controllers/user.controllers";


// Routing to the user controllers
router.route("/register").post(
    upload.single("avatar_img"),            // multer middleware
    register_user                           // controller
);                                          // https://localhost:8000/users/register

router.route("/login").post(
    login_user
);                                          // https://localhost:8000/users/login



// Secure Routes 
router.route("/logout").post(
    verify_user,                            // middleware
    logout_user                             // controller
);



export default router;