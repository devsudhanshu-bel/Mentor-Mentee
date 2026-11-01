import multer from "multer";
import { randomUUID } from "node:crypto";

import hodPrisma from "../../../config/prisma.hod.js";
import ApiError from "../../../utils/ApiError.js";
import ApiResponse from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/asyncHandler.js";

import {
  uploadLocalFile,
  deleteLocalFile,
} from "../../../utils/localStorage.js";

// ==========================================================
// CONFIGURATION
// ==========================================================

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const PUBLIC_AVATAR_URL_PREFIX = "/uploads/avatars/mentors/";

// ==========================================================
// IMAGE SIGNATURE VALIDATION
// ==========================================================

const validateImageSignature = (file) => {
  if (!Buffer.isBuffer(file.buffer) || file.buffer.length < 12) {
    return false;
  }

  const buffer = file.buffer;

  switch (file.mimetype) {
    case "image/jpeg":
      return (
        buffer[0] === 0xff &&
        buffer[1] === 0xd8 &&
        buffer[2] === 0xff
      );

    case "image/png":
      return (
        buffer.subarray(0, 8).toString("hex") ===
        "89504e470d0a1a0a"
      );

    case "image/webp":
      return (
        buffer.subarray(0, 4).toString() === "RIFF" &&
        buffer.subarray(8, 12).toString() === "WEBP"
      );

    default:
      return false;
  }
};

// ==========================================================
// AVATAR STORAGE HELPERS
// ==========================================================

const getLocalAvatarStorageKey = (profileImage) => {
  if (
    typeof profileImage !== "string" ||
    !profileImage.startsWith(PUBLIC_AVATAR_URL_PREFIX)
  ) {
    return null;
  }

  return `public/${profileImage.slice("/uploads/".length)}`;
};

const cleanupOldAvatar = async (profileImage) => {
  const storageKey = getLocalAvatarStorageKey(profileImage);

  // Preserve legacy Cloudinary images.
  if (!storageKey) return;

  try {
    await deleteLocalFile(storageKey);
  } catch (error) {
    console.error(
      "Failed to delete old mentor avatar:",
      error
    );
  }
};

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
  // ========================================================

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

    if (!validateImageSignature(req.file)) {
      req.file.buffer = null;

      throw new ApiError(
        400,
        "Invalid image content. Upload a valid JPEG, PNG or WebP image."
      );
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

    // Upload new image to persistent VPS storage.
    const uploaded = await uploadLocalFile(
      req.file,
      "avatars/mentors",
      [teacher.id]
    );

    const profileImage = `/uploads/${uploaded.storageKey.replace(
      /^public\//,
      ""
    )}`;

    let profile;

    try {
      profile = teacher.teacher_profiles
        ? await hodPrisma.teacher_profiles.update({
            where: {
              teacherId: teacher.id,
            },
            data: {
              profileImage,
              updatedAt: new Date(),
            },
            select: {
              id: true,
              profileImage: true,
            },
          })
        : await hodPrisma.teacher_profiles.create({
            data: {
              id: randomUUID(),
              teacherId: teacher.id,
              profileImage,
              updatedAt: new Date(),
            },
            select: {
              id: true,
              profileImage: true,
            },
          });
    } catch (error) {
      // Database failure: remove the newly uploaded image.
      try {
        await deleteLocalFile(uploaded.storageKey);
      } catch (cleanupError) {
        console.error(
          "Failed to clean up uploaded mentor avatar:",
          cleanupError
        );
      }

      throw error;
    }

    // Clean up old local image after successful DB update.
    await cleanupOldAvatar(
      teacher.teacher_profiles?.profileImage
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Mentor profile picture updated successfully.",
        {
          profileImage: profile.profileImage,
        }
      )
    );
  });

  // ========================================================
  // REMOVE PROFILE PICTURE
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

    await cleanupOldAvatar(
      teacher.teacher_profiles.profileImage
    );

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