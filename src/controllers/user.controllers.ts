import { async_handler } from "../utils/async_handler";
import { ApiResponse } from "../utils/ApiResponse";

const register_user = async_handler(async (req, res) => {
    // const { name, email, password } = req.body;

    res.status(200).json({
        message: "You have reached User Controller successfully",
    })
});

export { 
    register_user 
}