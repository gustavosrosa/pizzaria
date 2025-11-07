import multer from "multer"; // Used into sending of images
import crypto from 'crypto'; // Used for dont repeat the same name of diff images
import { extname, resolve } from "path"; // Used to pick the path of the images

export default {
    upload(folder: string) { // Where I prefer to save my image
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, '..', '..', folder), // Where the image will be saved / Dirname: Our directory where this archive is inside
                filename: (request, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString("hex");
                    const fileName = `${fileHash}-${file.originalname}`

                    return callback(null, fileName);
                } // Name of the photo, into documentation
            })
        }
    }
}