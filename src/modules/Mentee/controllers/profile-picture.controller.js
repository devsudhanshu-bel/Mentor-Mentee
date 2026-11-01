import multer from "multer";

import hodPrisma from "../../../config/prisma.hod.js";
import ApiError from "../../../utils/ApiError.js";
import ApiResponse from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/asyncHandler.js";

import {
  uploadLocalFile,
  deleteLocalFile,
} from "../../../utils/localStorage.js";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const PUBLIC_AVATAR_URL_PREFIX = "/uploads/avatars/mentees/";

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

  if (!storageKey) return;

  try {
    await deleteLocalFile(storageKey);
  } catch (error) {
    console.error("Failed to delete old local avatar:", error);
  }
};

// ==========================================================
// AVATAR UPLOAD MIDDLEWARE
// ==========================================================

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

// ==========================================================
// PROFILE PICTURE CONTROLLER
// ==========================================================

class ProfilePictureController {
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

    const uploaded = await uploadLocalFile(
      req.file,
      "avatars/mentees",
      [student.id]
    );

    const profileImage = `/uploads/${uploaded.storageKey.replace(
      /^public\//,
      ""
    )}`;

    let updatedStudent;

    try {
      updatedStudent = await hodPrisma.students.update({
        where: {
          id: student.id,
        },
        data: {
          profileImage,
          updatedAt: new Date(),
        },
        select: {
          profileImage: true,
        },
      });
    } catch (error) {
      try {
        await deleteLocalFile(uploaded.storageKey);
      } catch (cleanupError) {
        console.error(
          "Failed to clean up uploaded avatar:",
          cleanupError
        );
      }

      throw error;
    }

    await cleanupOldAvatar(student.profileImage);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Profile picture updated successfully.",
        {
          profileImage: updatedStudent.profileImage,
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

    await cleanupOldAvatar(student.profileImage);

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