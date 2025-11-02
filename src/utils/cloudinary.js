import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
cloudinary.config({ 
  cloud_name: process.env.CLOUDINAR_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,

});

const uploadOnCloudinary = async function(localFilePath){
    try{
        if(!localFilePath) return null;
        //upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto",

        })
        //file has been uploaded on cloudinary
        console.log('file uploaded on cloudinary successfully' , response.url);
        return response;

    }catch(error){
      fs.unlinkSync(localFilePath);
        console.log('Error while uploading on cloudinary', error);
        return null;
    }
}

export  { uploadOnCloudinary }; 