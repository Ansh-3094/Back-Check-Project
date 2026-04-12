import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //Upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //If file uploaded succesfully
    //console.log("File is uploaded on cloudinary", response.url);
    try {
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
    } catch (error) {
      // Ignore cleanup errors
    }
    return response;
  } catch (error) {
    try {
      if (localFilePath && fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
    } catch (cleanupError) {
      // Ignore cleanup errors
    }
    return null;
  }
};

const deleteOnCloudinary = async (identifier, resourceType = "image") => {
  try {
    if (!identifier) return null;

    let publicId = identifier;

    // When we only have a delivery URL in DB, derive public_id from URL path.
    if (typeof identifier === "string" && identifier.startsWith("http")) {
      const parts = identifier.split("/");
      const fileName = parts[parts.length - 1] || "";
      const withoutExtension = fileName.split(".")[0];
      publicId = withoutExtension || identifier;
    }

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    return result;
  } catch (error) {
    return null;
  }
};

export { uploadOnCloudinary, deleteOnCloudinary };
