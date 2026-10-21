import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 30 * 1024 * 1024, files: 1 },
  fileFilter(_req, file, callback) {
    const name = String(file.originalname || "").toLowerCase();
    const blockedExtensions = /\.(exe|dll|bat|cmd|com|msi|sh|ps1|scr|jar|apk|app|dmg)$/i;
    if (blockedExtensions.test(name)) {
      return callback(new Error("This file type is not allowed. Upload a document, image, archive, audio, or video file."));
    }
    callback(null, true);
  },
});

export default upload;
