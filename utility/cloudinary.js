import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadToCloudinary = async (uri, folder) => {
    const { secure_url } = await cloudinary.uploader.upload(uri, { folder: `new-sun/${folder}`, use_filename: true })
    return secure_url
}