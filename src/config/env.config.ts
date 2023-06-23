export const envConfig = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3001,
  cloudinay_api_secret: process.env.CLOUDINARY_API_SECRET,
  cloudinay_name: process.env.CLOUDINARY_NAME,
  cloudinay_api_key: process.env.CLOUDINARY_API_KEY,
  jwtScret: process.env.JWT_SECRET,
});
