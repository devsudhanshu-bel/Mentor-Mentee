import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

/* ==========================================================
   ROUTES
========================================================== */

import authRoutes from "./modules/auth/routes/auth.routes.js";
import menteeRoutes from "./modules/Mentee/routes/mentee.routes.js";
import adminRoutes from "./modules/admin/routes/admin.routes.js";
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

/* ==========================================================
   APP
========================================================== */

const app = express();

/* ==========================================================
   CORS CONFIGURATION
========================================================== */

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",

  // Include your configured frontend origin, if provided.
  ...(process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(",")
        .map((origin) => origin.trim().replace(/\/+$/, ""))
        .filter(Boolean)
    : []),
];

app.use(
  cors({
    origin(origin, callback) {
      // Permit requests without an Origin header, such as server-to-server
      // requests and local command-line tools.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS blocked request from origin: ${origin}`)
      );
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

/* ==========================================================
   SECURITY
========================================================== */

app.use(helmet());

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
  return res.status(200).json({
    success: true,
    message: "Mentor-Mentee Backend Running 🚀",
  });
});

/* ==========================================================
   AUTHENTICATION
========================================================== */

app.use("/api/auth", authRoutes);

/* ==========================================================
   MENTEE / STUDENT
========================================================== */

app.use("/api/mentee", menteeRoutes);

/* ==========================================================
   ADMIN
========================================================== */

app.use("/api/admin", adminRoutes);

/* ==========================================================
   MENTOR
========================================================== */

app.use("/api/mentor", mentorRoutes);

/* ==========================================================
   MENTOR STUDENTS
========================================================== */

app.use("/api/mentor/students", mentorStudentsRoutes);

/* ==========================================================
   MENTOR STUDENT ACADEMICS
========================================================== */

app.use("/api/mentor/students", mentorAcademicsRoutes);

/* ==========================================================
   MENTOR STUDENT ATTENDANCE
========================================================== */

app.use("/api/mentor/students", attendanceRoutes);

/* ==========================================================
   MENTOR RESEARCH
========================================================== */

app.use("/api/mentor/students", mentorResearchRoutes);

app.use(
  "/api/mentor/students",
  mentorCoCurricularRoutes
);

app.use(
  "/api/mentor/students",
  mentorExtraCurricularRoutes
);

app.use(
  "/api/mentor/students",
  mentorAwardsAchievementsRoutes
);

app.use("/api/mentor/students", mentorDocumentsRoutes);

app.use("/api/mentor/students", mentorCertificatesRoutes);

/* ==========================================================
   404 HANDLER
========================================================== */

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

/* ==========================================================
   GLOBAL ERROR HANDLER
========================================================== */

app.use((err, req, res, next) => {
  console.error("❌ Error:", err);

  return res.status(err.statusCode || 500).json({
    success: false,
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
  });
});

export default app;