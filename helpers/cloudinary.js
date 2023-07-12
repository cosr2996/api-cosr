import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({ 
    cloud_name: 'dxo0ixedn', 
    api_key: '888687445711312', 
    api_secret: '0HeW-LY5miI6qCnEw3aOsXw3m5s',
    secure: true
  });

export async function uploadImage(filePath){
   return await cloudinary.uploader.upload(filePath,{
    folder:"cosr"
   })
}

export async function deleteImage(public_id){
    return await cloudinary.uploader.destroy(public_id)
}