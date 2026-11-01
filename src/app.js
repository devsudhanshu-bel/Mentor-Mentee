import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "node:path";

// ==========================================================
// ROUTES
// ==========================================================

import authRoutes from "./modules/auth/routes/auth.routes.js";
import menteeRoutes from "./modules/Mentee/routes/mentee.routes.js";
import announcementFeedRoutes from "./modules/announcements/announcementFeed.routes.js";

import adminRoutes from "./modules/admin/routes/admin.routes.js";
import adminStudentProfileRoutes from "./modules/admin/student-profile/studentProfile.routes.js";
import mentorDetailsRoutes from "./modules/admin/routes/mentorDetails.routes.js";

import mentorRoutes from "./modules/mentor/routes/mentor.routes.js";
import mentorStudentsRoutes from "./modules/mentor/routes/students.routes.js";
import mentorAcademicsRoutes from "./modules/mentor/routes/academics.routes.js";
import attendanceRoutes from "./modules/mentor/routes/attendance.routes.js";
import mentorResearchRoutes from "./modules/mentor/routes/research.routes.js";
import mentorCoCurricularRoutes from "./modules/mentor/routes/cocurricular.routes.js";
import mentorExtraCurricularRoutes from "./modules/mentor/routes/extraCurricular.routes.js";
import mentorAwardsAchievementsRoutes from "./modules/mentor/routes/awardsAchievements.routes.js";
import mentorDocumentsRoutes from "./modules/mentor/routes/documents.routes.js";
import mentorCertificatesRoutes from "./modules/mentor/routes/certificates.routes.js";
import mentorOverviewRoutes from "./modules/mentor/routes/overview.routes.js";
import mentorMeetingsRoutes from "./modules/mentor/routes/meetings.routes.js";
import studentReportRoutes from "./modules/mentor/routes/studentReport.routes.js";

import messagesRoutes from "./modules/chat/messages.routes.js";

// Private local file delivery
import fileRoutes from "./modules/files/files.routes.js";

// Authentication
import { authenticate } from "./middleware/auth.middleware.js";

// ==========================================================
// APP
// ==========================================================

const app = express();

// ==========================================================
// CORS CONFIGURATION
// ==========================================================

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",

  ...(process.env.CLIENT_URL
    ? process.env.CLIENT_URL
        .split(",")
        .map((origin) => origin.trim().replace(/\/+$/, ""))
        .filter(Boolean)
    : []),
];

const corsOptions = {
  origin(origin, callback) {
    // Allow requests without an Origin header.
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(
      new Error(`CORS blocked request from origin: ${origin}`)
    );
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Accept",
    "Authorization",
    "Content-Type",
    "Cache-Control",
    "Pragma",
    "X-Requested-With",
  ],

  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

// ==========================================================
// SECURITY
// ==========================================================

app.use(helmet());

// ==========================================================
// PUBLIC LOCAL STORAGE
//
// Only /data/uploads/public is exposed.
// Private documents are NEVER served statically.
// ==========================================================

const PUBLIC_UPLOAD_ROOT = path.resolve(
  process.env.UPLOAD_ROOT || "/data/uploads",
  "public"
);

app.use(
  "/uploads",
  express.static(PUBLIC_UPLOAD_ROOT, {
    dotfiles: "deny",
    index: false,
    fallthrough: true,
    maxAge: "1d",
    immutable: true,

    setHeaders(res) {
      res.setHeader("X-Content-Type-Options", "nosniff");
    },
  })
);

// ==========================================================
// BODY PARSERS
// ==========================================================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

// ==========================================================
// LOGGER
//
// Do not log query strings because private file URLs
// contain signed access tokens.
// ==========================================================

app.use(
  morgan((tokens, req, res) => {
    const safeUrl = req.originalUrl.split("?")[0];

    return [
      tokens.method(req, res),
      safeUrl,
      tokens.status(req, res),
      `${tokens["response-time"](req, res)} ms`,
    ].join(" ");
  })
);

// ==========================================================
// HEALTH CHECK
// ==========================================================

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Mentor-Mentee Backend Running 🚀",
  });
});

// ==========================================================
// AUTHENTICATION
// ==========================================================

app.use("/api/auth", authRoutes);

// ==========================================================
// PRIVATE FILE DELIVERY
//
// Authentication and record-level authorization are handled
// by the file routes and files service.
// ==========================================================

app.use("/api/files", fileRoutes);

// ==========================================================
// ANNOUNCEMENTS
// ==========================================================

app.use("/api/announcements", announcementFeedRoutes);

// ==========================================================
// MENTEE / STUDENT
// ==========================================================

app.use("/api/mentee", menteeRoutes);

// ==========================================================
// ADMIN MENTOR DETAILS
// ==========================================================

app.use("/api/admin", mentorDetailsRoutes);

// ==========================================================
// ADMIN
// ==========================================================

app.use("/api/admin", adminRoutes);
app.use("/api/admin/student-profile", adminStudentProfileRoutes);

// ==========================================================
// MENTOR
// ==========================================================

app.use("/api/mentor", mentorRoutes);

// ==========================================================
// MENTOR STUDENTS
// ==========================================================

app.use("/api/mentor/students", mentorStudentsRoutes);

// ==========================================================
// MENTOR STUDENT ACADEMICS
// ==========================================================

app.use("/api/mentor/students", mentorAcademicsRoutes);

// ==========================================================
// MENTOR STUDENT ATTENDANCE
// ==========================================================

app.use("/api/mentor/students", attendanceRoutes);

// ==========================================================
// MENTOR RESEARCH
// ==========================================================

app.use("/api/mentor/students", mentorResearchRoutes);

// ==========================================================
// MENTOR CO-CURRICULAR
// ==========================================================

app.use("/api/mentor/students", mentorCoCurricularRoutes);

// ==========================================================
// MENTOR EXTRA-CURRICULAR
// ==========================================================

app.use("/api/mentor/students", mentorExtraCurricularRoutes);

// ==========================================================
// MENTOR AWARDS & ACHIEVEMENTS
// ==========================================================

app.use("/api/mentor/students", mentorAwardsAchievementsRoutes);

// ==========================================================
// MENTOR DOCUMENTS
// ==========================================================

app.use("/api/mentor/students", mentorDocumentsRoutes);

// ==========================================================
// MENTOR CERTIFICATES
// ==========================================================

app.use("/api/mentor/students", mentorCertificatesRoutes);

// ==========================================================
// MENTOR OVERVIEW & REPORTS
// ==========================================================

app.use("/api/mentor/students", mentorOverviewRoutes);
app.use("/api/mentor/students", studentReportRoutes);

// ==========================================================
// MENTOR MEETINGS
// ==========================================================

app.use("/api/mentor/students", mentorMeetingsRoutes);

// ==========================================================
// CHAT / MESSAGES
// ==========================================================

app.use("/api/chat", authenticate, messagesRoutes);

// ==========================================================
// UPLOAD ERROR HANDLER
// ==========================================================

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    const message =
      err.code === "LIMIT_FILE_SIZE"
        ? "File exceeds the allowed upload size."
        : "Invalid file upload.";

    return res.status(400).json({
      success: false,
      statusCode: 400,
      message,
    });
  }

  next(err);
});

// ==========================================================
// 404 HANDLER
// ==========================================================

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ==========================================================
// GLOBAL ERROR HANDLER
// ==========================================================

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  // Do not expose internal error details to clients.
  console.error("Request failed:", {
    method: req.method,
    path: req.path,
    status: err.statusCode || err.status || 500,
    message: err.message,
  });

  return res.status(err.statusCode || err.status || 500).json({
    success: false,
    statusCode: err.statusCode || err.status || 500,
    message:
      err.statusCode || err.status
        ? err.message
        : "Internal Server Error",
  });
});

export default app;