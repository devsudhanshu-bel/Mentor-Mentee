import cloudinary from "../config/cloudinary.js";

const deleteFromCloudinary = async (
  publicId,
  resourceType = "raw"
) => {
  if (!publicId) {
    throw new Error("Cloudinary public ID is required.");
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    if (
      result.result !== "ok" &&
      result.result !== "not found"
    ) {
      throw new Error("Failed to delete file from Cloudinary.");
    }

    return result;
  } catch (error) {
    throw new Error(
      error.message ||
        "An error occurred while deleting the Cloudinary file."
    );
  }
};

export default deleteFromCloudinary;