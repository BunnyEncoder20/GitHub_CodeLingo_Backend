import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../public/temp')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '_' + uniqueSuffix)
        console.log(file)
        console.log(`📁 Recieved ${file.originalname} for upload`)
    }
})

export const upload = multer({ 
    storage: storage 
})