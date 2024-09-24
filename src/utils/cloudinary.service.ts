import { v2 as cloudinary } from 'cloudinary';
import fs from "fs" 
import path from "path"


// Actual Funciton to upload image

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET, 
});

// delay helper function
const delay = (ms : number) => {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}


// Function to upload image to cloundinary servers
export async function upload2Cloudinary(localFilePath : string, retryAttempt : number = 0) : Promise<any> {
    const maxRetries = 3;
    const retryDelays = [30*1000, 60*1000, 300*1000, 600*1000];     // Delays of 30s, 1m, 5m, 10m respectively

    try {
        // uploading the image from local file path 
        const uploadResult = await cloudinary.uploader.upload(localFilePath,{
            public_id:"profile_image",
            resource_type:"image",
            transformations:[
                { width:400, height:400, crop:"fill" , gravity:"face" },    // Cropping to sqaure around the face 
                { radius:"max" },                                           // Making the image round for the profile image holder
                { fetch_format:"auto", quality:"auto" }                     // Auto format and quality for optimizations
            ],
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET,
            cloud_name: process.env.CLOUD_NAME, 
        });

        // delete the image from local storage after uploading to cloudinary
        fs.unlink(path.resolve(localFilePath), (err) => {
            if (err) {
                console.error("❗ [cloudinary] Error deleting local file:", err);
            } else {
                console.log("🗑️ [cloudinary] Local file deleted successfully");
            }
        });

        // Filter the sensitive data out, only return required fields
        const filteredUploadResult = {
            url: uploadResult.url,
            public_id: uploadResult.public_id,
            secure_url: uploadResult.secure_url,
            format: uploadResult.format,
            width: uploadResult.width,
            height: uploadResult.height
        };

        console.log("🟩 [cloudinary] Uploaded asset to cloudinary server successfully\nUpload Results : ",filteredUploadResult);
        return filteredUploadResult;
    }
    catch(error){
        console.error("❗ [cloudinary] Upload failed:",error)

        if (retryAttempt < maxRetries) {
            const retryDelay = retryDelays[retryAttempt];
            console.log(`⏳ Retrying upload in ${retryDelay/1000} seconds...(Attempt ${retryAttempt + 1})`);

            await delay(retryDelay);
            return upload2Cloudinary(localFilePath, retryAttempt + 1);
        } else {
            console.error("❌ [cloudinary]  Upload failed after all retry attempts");
            throw error;
        }

    }
}






/*
// default cloudinary function
(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: process.send.CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET, 
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader.upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', 
           {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,zz
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();   
*/