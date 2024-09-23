import multer, { StorageEngine } from "multer";
import { Request } from "express";
// import { v4 as uuidv4 } from "uuid";  // Use for generating unique IDs

// Define the storage with type safety
const storage: StorageEngine = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void): void {
        cb(null, '../../public/temp');
    },
    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void): void {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}_${uniqueSuffix}`);
        console.log(file);
        console.log(`📁 Received ${file.originalname} for upload`);
    }
});

// Export the multer upload function with type safety
export const upload = multer({
    storage: storage
});