import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

try {
  const result = await cloudinary.uploader.upload(
    "D:/HIVE/hive_documentation.pdf",
    {
      resource_type: "raw",
      folder: "mentor-mentee/test",
    }
  );

  console.log(result);
} catch (err) {
  console.log("====== ERROR KEYS ======");
  console.log(Object.keys(err));

  console.log("\n====== COMPLETE ERROR ======");
  console.dir(err, { depth: null });

  if (err.response) {
    console.log("\n====== RESPONSE ======");
    console.dir(err.response, { depth: null });
  }

  if (err.error) {
    console.log("\n====== ERROR BODY ======");
    console.dir(err.error, { depth: null });
  }
}