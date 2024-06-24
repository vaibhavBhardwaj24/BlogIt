import { v2 } from "cloudinary";
import fs from "fs";
v2.config({
  cloud_name: "dwpsq6hel",
  api_key: 658327713911422,
  api_secret: "xfw9ehK942BC_WCAKRyxy-YW394",
});
const delCloud = async (pubId) => {
  await v2.uploader.destroy(pubId, (err, res) => {
    if (err) {
      console.error("not deleted", err);
    } else {
      console.log("deleted");
    }
  });
};
const uploadCloud = async (localPath) => {
  try {
    if (!localPath) {
      console.log("file path not found");
      return null;
    }
    const result = await v2.uploader.upload(localPath, {
      resource_type: "auto",
    });
    return result.url;
  } catch (error) {
    fs.unlinkSync(localPath);
    console.error("not uploaded", error);
  }
};
export { uploadCloud, delCloud };
