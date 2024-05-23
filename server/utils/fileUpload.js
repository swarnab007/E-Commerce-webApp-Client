const cloudinary = require("cloudinary").v2;

// uploading file on cloudinary
const uploadCloudinary = async (localFilePath) => {
  try {
    if (localFilePath) {
      // console.log("path",localFilePath.path);
      let res = await cloudinary.uploader.upload(localFilePath.path, {
        resource_type: "auto",
      });
      // remove the file if uploaded
      fs.unlinkSync(localFilePath);
      console.log("Flie uploaded successfully", res.url);
      return res;
    } else {
      return null;
    }
  } catch (error) {
    console.log("cloudinary upload error", error);
    return error;
  }
};

module.exports = uploadCloudinary;
