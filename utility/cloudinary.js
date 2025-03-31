import { v2 as cloudinary } from "cloudinary"
import { Readable } from "stream"

import multer from "multer"

process.env.NODE_ENV !== 'production' && process.loadEnvFile()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadToCloudinary = async (uri, folder) => {
    const { secure_url: url, public_id: id } = await cloudinary.uploader.upload(uri, {
        folder: `new-sun/${folder}`,
        use_filename: true
    })
    return { url, id }
}

export const uploadStreamToCloudinary = async (buffer, folder, filename) => {
    if (!buffer) return null
    const { secure_url: url, public_id: id } = new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
            folder: `new-sun/${folder}`,
            filename_override: filename
        },
            (err, res) => {
                if (err) reject(err)
                else resolve(res)
            })
        Readable.from(buffer).pipe(stream)
    })
    return { url, id }
}

export const formMediaUploader = multer({
    storage: multer.memoryStorage()
})