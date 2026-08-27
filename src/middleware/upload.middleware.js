import multer from "multer";

const storage = multer.memoryStorage();

const allowedMimeTypes = [
  // PDF
  "application/pdf",

  // Microsoft Word
  "application/msword",

  // DOCX
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  // Excel
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

  // PowerPoint
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",

  // Images
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",

  // Text
  "text/plain",

  // ZIP
  "application/zip",
  "application/x-zip-compressed",

  // CSV
  "text/csv",
];

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  cb(new Error("Unsupported file type."), false);
};

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },

  fileFilter,
});

export default upload;