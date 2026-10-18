import multer from "multer";

import hodPrisma from "../../../config/prisma.hod.js";
import ApiError from "../../../utils/ApiError.js";
import ApiResponse from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/asyncHandler.js";

import uploadToCloudinary from "../../../utils/cloudinaryUpload.js";
import deleteFromCloudinary from "../../../utils/cloudinaryDelete.js";

// ==========================================================
// CONFIGURATION
// ==========================================================

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

// ==========================================================
// MULTER UPLOAD
// ==========================================================

export const mentorAvatarUpload = multer({
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

// ==========================================================
// CONTROLLER
// ==========================================================

class MentorProfilePictureController {
  // ========================================================
  // UPLOAD / REPLACE PROFILE PICTURE
  // POST /api/mentor/profile/picture
  // ========================================================

  upload = asyncHandler(async (req, res) => {
    const userId = req.user?.id;

    if (!userId) {
      throw new ApiError(401, "Authentication required.");
    }

    if (!req.file) {
      throw new ApiError(400, "Please select a profile picture.");
    }

    // Resolve the authenticated user to their teacher record.
    const teacher = await hodPrisma.teachers.findUnique({
      where: {
        userAccountId: userId,
      },

      select: {
        id: true,
        teacher_profiles: {
          select: {
            id: true,
            profileImage: true,
          },
        },
      },
    });

    if (!teacher) {
      throw new ApiError(404, "Mentor profile not found.");
    }

    // Upload the new image to the dedicated mentor folder.
    const uploaded = await uploadToCloudinary(
      req.file,
      "avatars/mentors"
    );

    if (!uploaded?.url || !uploaded?.publicId) {
      throw new ApiError(
        502,
        "Cloudinary did not return the expected image details."
      );
    }

    try {
      // Update an existing profile or create one if necessary.
      const profile = teacher.teacher_profiles
        ? await hodPrisma.teacher_profiles.update({
            where: {
              teacherId: teacher.id,
            },

            data: {
              profileImage: uploaded.url,
              updatedAt: new Date(),
            },

            select: {
              id: true,
              profileImage: true,
            },
          })
        : await hodPrisma.teacher_profiles.create({
            data: {
              id: crypto.randomUUID(),
              teacherId: teacher.id,
              profileImage: uploaded.url,
              updatedAt: new Date(),
            },

            select: {
              id: true,
              profileImage: true,
            },
          });

      return res.status(200).json(
        new ApiResponse(
          200,
          "Mentor profile picture updated successfully.",
          {
            profileImage: profile.profileImage,
            publicId: uploaded.publicId,
          }
        )
      );
    } catch (error) {
      // Avoid leaving an orphaned image if the database write fails.
      try {
        await deleteFromCloudinary(uploaded.publicId, "image");
      } catch (cleanupError) {
        console.error(
          "Failed to clean up uploaded mentor avatar:",
          cleanupError.message
        );
      }

      throw error;
    }
  });

  // ========================================================
  // REMOVE PROFILE PICTURE
  // DELETE /api/mentor/profile/picture
  // ========================================================

  remove = asyncHandler(async (req, res) => {
    const userId = req.user?.id;

    if (!userId) {
      throw new ApiError(401, "Authentication required.");
    }

    const teacher = await hodPrisma.teachers.findUnique({
      where: {
        userAccountId: userId,
      },

      select: {
        id: true,
        teacher_profiles: {
          select: {
            id: true,
            profileImage: true,
          },
        },
      },
    });

    if (!teacher) {
      throw new ApiError(404, "Mentor profile not found.");
    }

    if (!teacher.teacher_profiles) {
      return res.status(200).json(
        new ApiResponse(
          200,
          "No uploaded profile picture was found.",
          {
            profileImage: null,
          }
        )
      );
    }

    await hodPrisma.teacher_profiles.update({
      where: {
        teacherId: teacher.id,
      },

      data: {
        profileImage: null,
        updatedAt: new Date(),
      },
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Mentor profile picture removed successfully.",
        {
          profileImage: null,
        }
      )
    );
  });
}

export default new MentorProfilePictureController();