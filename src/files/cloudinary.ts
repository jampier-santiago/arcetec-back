// Packages
import { v2 as cloudinary } from 'cloudinary';

// Configuration with cloudinary credentials
export const CloudinaryProvider = {
  useFactory: () => {
    return cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
      isGlobal: true,
    });
  },
};
