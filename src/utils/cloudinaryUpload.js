import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = (file, folder) => {
  return new Promise((resolve, reject) => {
    // ==========================================================
    // VALIDATION
    // ==========================================================

    if (!file) {
      return reject(
        new Error("File is required.")
      );
    }

    if (!file.buffer) {
      return reject(
        new Error("File buffer is missing.")
      );
    }

    if (!folder) {
      return reject(
        new Error("Cloudinary folder is required.")
      );
    }

    // ==========================================================
    // FILE INFORMATION
    // ==========================================================

    const mimeType =
      file.mimetype?.toLowerCase() || "";

    const originalName =
      file.originalname || "document";

    const extension =
      originalName
        .split(".")
        .pop()
        ?.toLowerCase() || "";

    // ==========================================================
    // DETERMINE CLOUDINARY RESOURCE TYPE
    // ==========================================================
    //
    // PDF:
    // Cloudinary should store PDFs as IMAGE assets.
    //
    // Images:
    // IMAGE
    //
    // Videos:
    // VIDEO
    //
    // Other documents:
    // RAW
    //
    // ==========================================================

    let resourceType = "raw";

    if (
      mimeType === "application/pdf" ||
      extension === "pdf"
    ) {
      resourceType = "image";
    } else if (
      mimeType.startsWith("image/")
    ) {
      resourceType = "image";
    } else if (
      mimeType.startsWith("video/")
    ) {
      resourceType = "video";
    } else if (
      mimeType.startsWith("audio/")
    ) {
      // Cloudinary treats audio as video assets.
      resourceType = "video";
    } else {
      resourceType = "raw";
    }

    // ==========================================================
    // DEBUG LOG
    // ==========================================================

    console.log(
      "========== CLOUDINARY UPLOAD =========="
    );

    console.log({
      folder,
      originalName,
      mimeType,
      extension,
      size: file.size,
      hasBuffer: !!file.buffer,
      bufferLength: file.buffer?.length,
      resourceType,
    });

    console.log(
      "======================================="
    );

    // ==========================================================
    // CLOUDINARY UPLOAD OPTIONS
    // ==========================================================

    const uploadOptions = {
      folder,

      // IMPORTANT:
      // PDF -> image
      // image -> image
      // video/audio -> video
      // other documents -> raw
      resource_type: resourceType,

      // Preserve original filename.
      use_filename: true,

      // Prevent collisions.
      unique_filename: true,

      // Never overwrite existing files.
      overwrite: false,
    };

    // ==========================================================
    // IMPORTANT FOR RAW FILES
    // ==========================================================
    //
    // Cloudinary raw assets need the extension included
    // in their public ID.
    //
    // For PDF/image/video assets Cloudinary handles the
    // format as part of the asset delivery.
    //
    if (
      resourceType === "raw" &&
      extension
    ) {
      uploadOptions.public_id =
        originalName.replace(
          /\.[^/.]+$/,
          ""
        );
    }

    // ==========================================================
    // UPLOAD STREAM
    // ==========================================================

    const uploadStream =
      cloudinary.uploader.upload_stream(
        uploadOptions,

        (error, result) => {
          // ====================================================
          // CLOUDINARY ERROR
          // ====================================================

          if (error) {
            console.error(
              "========== CLOUDINARY ERROR =========="
            );

            console.error(error);

            console.error(
              JSON.stringify(
                error,
                null,
                2
              )
            );

            console.error(
              "======================================"
            );

            return reject(error);
          }

          // ====================================================
          // INVALID RESPONSE
          // ====================================================

          if (!result) {
            return reject(
              new Error(
                "Cloudinary upload failed."
              )
            );
          }

          // ====================================================
          // SUCCESS
          // ====================================================

          console.log(
            "========== CLOUDINARY SUCCESS =========="
          );

          console.log({
            publicId:
              result.public_id,

            url:
              result.secure_url,

            resourceType:
              result.resource_type,

            deliveryType:
              result.type,

            bytes:
              result.bytes,

            format:
              result.format,

            originalFilename:
              result.original_filename,

            version:
              result.version,
          });

          console.log(
            "========================================"
          );

          // ====================================================
          // RETURN DATA
          // ====================================================

          resolve({
            publicId:
              result.public_id,

            url:
              result.secure_url,

            fileType:
              result.format ||
              extension ||
              mimeType
                .split("/")
                .pop() ||
              "file",

            fileSize:
              result.bytes ||
              file.size ||
              0,

            resourceType:
              result.resource_type ||
              resourceType,

            originalFilename:
              result.original_filename ||
              originalName,

            deliveryType:
              result.type ||
              "upload",

            version:
              result.version,
          });
        }
      );

    // ==========================================================
    // SEND FILE BUFFER
    // ==========================================================

    uploadStream.end(
      file.buffer
    );
  });
};

export default uploadToCloudinary;