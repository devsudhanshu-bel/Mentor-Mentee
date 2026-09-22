import express from "express";

import cors from "cors";

import helmet from "helmet";

import morgan from "morgan";

import cookieParser from "cookie-parser";

/* ==========================================================
   ROUTES
========================================================== */

import authRoutes from "./modules/auth/routes/auth.routes.js";

import mentorRoutes from "./modules/mentor/routes/mentor.routes.js";

import mentorStudentsRoutes from "./modules/mentor/routes/students.routes.js";

import mentorDashboardRoutes from "./modules/mentor/routes/dashboard.routes.js";

import menteeRoutes from "./modules/Mentee/routes/mentee.routes.js";

import attendanceRoutes from "./modules/Mentee/attendance/routes/attendance.routes.js";

import studentRoutes from "./modules/admin/students/student.routes.js";

import assignmentRoutes from "./modules/admin/assignments/assignment.routes.js";

import termChangeRoutes from "./modules/admin/term-change/termChange.routes.js";

const app = express();

/* ==========================================================
   SECURITY MIDDLEWARE
========================================================== */

app.use(helmet());

/* ==========================================================
   CORS
========================================================== */

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

/* ==========================================================
   BODY PARSERS
========================================================== */

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

/* ==========================================================
   LOGGER
========================================================== */

app.use(morgan("dev"));

/* ==========================================================
   HEALTH CHECK
========================================================== */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Mentor-Mentee Backend Running 🚀",
  });
});

/* ==========================================================
   API ROUTES
========================================================== */

/* ---------------- Authentication ---------------- */

app.use(
  "/api/auth",
  authRoutes
);

/* ==========================================================
   MENTOR
========================================================== */

/* ---------------- Mentor Profile / Overview ---------------- */

app.use(
  "/api/mentor",
  mentorRoutes
);

/* ---------------- Mentor Students ---------------- */

app.use(
  "/api/mentor/students",
  mentorStudentsRoutes
);

/* ---------------- Mentor Dashboard ---------------- */

app.use(
  "/api/mentor/dashboard",
  mentorDashboardRoutes
);

/* ==========================================================
   MENTEE
========================================================== */

/* ---------------- Mentee ---------------- */

app.use(
  "/api/mentee",
  menteeRoutes
);

/* ==========================================================
   ATTENDANCE
========================================================== */

/* ---------------- Attendance ---------------- */

app.use(
  "/api/attendance",
  attendanceRoutes
);

/* ==========================================================
   ADMIN
========================================================== */

/* ---------------- Assignments ---------------- */

app.use(
  "/api/admin/assignments",
  assignmentRoutes
);

/* ---------------- Term Change ---------------- */

app.use(
  "/api/admin/term-change",
  termChangeRoutes
);

/* ---------------- Students ---------------- */

app.use(
  "/api/admin/students",
  studentRoutes
);

/* ==========================================================
   404 HANDLER
========================================================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

/* ==========================================================
   GLOBAL ERROR HANDLER
========================================================== */

app.use((err, req, res, next) => {
  console.error("❌ Error:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    statusCode: err.statusCode || 500,
    message:
      err.message ||
      "Internal Server Error",
  });
});

export default app;