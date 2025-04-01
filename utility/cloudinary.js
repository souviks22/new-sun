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
    if (!buffer) return null;

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: `new-sun/${folder}`,
                filename_override: filename
            },
            (err, res) => {
                if (err) reject(err)
                    else {
                    resolve({ url: res.secure_url, id: res.public_id });
                }
            }
        );
        Readable.from(buffer).pipe(stream);
    });
};

export const formMediaUploader = multer({
    storage: multer.memoryStorage()
})