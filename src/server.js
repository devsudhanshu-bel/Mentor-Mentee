import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

// Handle Uncaught Exceptions
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log("=======================================");
  console.log("🚀 Mentor-Mentee Backend Started");
  console.log(`🌐 Server : http://localhost:${PORT}`);
  console.log(`📦 Environment : ${process.env.NODE_ENV || "development"}`);
  console.log("=======================================");
});

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (error) => {
  console.error("❌ Unhandled Rejection:", error);

  server.close(() => {
    process.exit(1);
  });
});