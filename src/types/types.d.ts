import { User } from "../models/users.model";

declare global {
    namespace Express {
        interface Request {
            user?: User;  // Assuming User is from your User model
        }
    }
}

export {}