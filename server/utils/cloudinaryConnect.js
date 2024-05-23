const cloudinary = require("cloudinary").v2;

const cloudinaryconnect = async () => {
  // console.log(process.env.DB_URL);
  try {
    cloudinary.config({
      //!    ########   Configuring the Cloudinary to Upload MEDIA ########
      cloud_name: "dsxlusxr8",
      api_key: "267717691171762",
      api_secret: "F4qslrONFseLUAiWqK8TVMWMdgQ",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = cloudinaryconnect;
