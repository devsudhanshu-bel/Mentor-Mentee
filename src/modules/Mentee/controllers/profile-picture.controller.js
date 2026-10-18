
import multer from "multer";

import hodPrisma from "../../../config/prisma.hod.js";
import ApiError from "../../../utils/ApiError.js";
import ApiResponse from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/asyncHandler.js";

import uploadToCloudinary from "../../../utils/cloudinaryUpload.js";
import deleteFromCloudinary from "../../../utils/cloudinaryDelete.js";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

/* ==========================================================
   AVATAR UPLOAD MIDDLEWARE
========================================================== */

export const avatarUpload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1,
  },

  fileFilter(req, file, callback) {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      return callback(
        new ApiError(
          400,
          "Only JPEG, PNG and WebP images are allowed."
        )
      );
    }

    callback(null, true);
  },
}).single("profileImage");

/* ==========================================================
   PROFILE PICTURE CONTROLLER
========================================================== */

class ProfilePictureController {
  /* ========================================================
     UPLOAD / REPLACE PROFILE PICTURE
  ======================================================== */

  upload = asyncHandler(async (req, res) => {
    const userId = req.user?.id;

    if (!userId) {
      throw new ApiError(401, "Authentication required.");
    }

    if (!req.file) {
      throw new ApiError(
        400,
        "Please select a profile picture."
      );
    }

    // Find the authenticated student's own record.
    const student = await hodPrisma.students.findUnique({
      where: {
        userAccountId: userId,
      },

      select: {
        id: true,
        profileImage: true,
      },
    });

    if (!student) {
      throw new ApiError(
        404,
        "Student profile not found."
      );
    }

    // Upload the new image before changing the database.
    const uploaded = await uploadToCloudinary(
      req.file,
      "avatars/mentees"
    );

    if (!uploaded?.url || !uploaded?.publicId) {
      throw new ApiError(
        502,
        "Cloudinary did not return the expected image details."
      );
    }

    let updatedStudent;

    try {
      updatedStudent = await hodPrisma.students.update({
        where: {
          id: student.id,
        },

        data: {
          profileImage: uploaded.url,
          updatedAt: new Date(),
        },

        select: {
          profileImage: true,
        },
      });
    } catch (error) {
      // Database update failed: clean up the newly uploaded image.
      try {
        await deleteFromCloudinary(
          uploaded.publicId,
          "image"
        );
      } catch (cleanupError) {
        console.error(
          "Failed to clean up uploaded avatar:",
          cleanupError.message
        );
      }

      throw error;
    }

    /*
     * The current database stores the image URL, not its Cloudinary
     * public ID. Do not guess the previous public ID from its URL.
     * Persisting public IDs will enable reliable old-image cleanup.
     */

    return res.status(200).json(
      new ApiResponse(
        200,
        "Profile picture updated successfully.",
        {
          profileImage: updatedStudent.profileImage,
          publicId: uploaded.publicId,
        }
      )
    );
  });

  /* ========================================================
     REMOVE PROFILE PICTURE
  ======================================================== */

  remove = asyncHandler(async (req, res) => {
    const userId = req.user?.id;

    if (!userId) {
      throw new ApiError(401, "Authentication required.");
    }

    const student = await hodPrisma.students.findUnique({
      where: {
        userAccountId: userId,
      },

      select: {
        id: true,
        profileImage: true,
      },
    });

    if (!student) {
      throw new ApiError(
        404,
        "Student profile not found."
      );
    }

    await hodPrisma.students.update({
      where: {
        id: student.id,
      },

      data: {
        profileImage: null,
        updatedAt: new Date(),
      },
    });

    /*
     * Clear the saved image URL. Cloudinary deletion is deferred
     * until we persist the public ID in the database.
     */

    return res.status(200).json(
      new ApiResponse(
        200,
        "Profile picture removed successfully.",
        {
          profileImage: null,
        }
      )
    );
  });
}

export default new ProfilePictureController();
