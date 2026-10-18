import dotenv from "dotenv";
dotenv.config();

import http from "node:http";
import { Server } from "socket.io";

import app from "./app.js";

/* ==========================================================
   CONFIGURATION
========================================================== */

const PORT = process.env.PORT || 5000;

/* ==========================================================
   CORS CONFIGURATION
========================================================== */

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

/* ==========================================================
   HTTP SERVER
========================================================== */

const server = http.createServer(app);

/* ==========================================================
   SOCKET.IO CONFIGURATION
========================================================== */

const io = new Server(server, {
  cors: {
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`Socket.IO CORS blocked origin: ${origin}`)
      );
    },

    credentials: true,

    methods: ["GET", "POST"],
  },

  // Allow reconnection after temporary network interruptions.
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
    skipMiddlewares: false,
  },
});

/* ==========================================================
   MAKE SOCKET.IO AVAILABLE TO EXPRESS
========================================================== */

app.set("io", io);

/* ==========================================================
   SOCKET CONNECTION HANDLING
========================================================== */

io.on("connection", (socket) => {
  console.log(`💬 Socket connected: ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(
      `🔌 Socket disconnected: ${socket.id} (${reason})`
    );
  });
});

/* ==========================================================
   PROCESS ERROR HANDLERS
========================================================== */

process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);

  // An uncaught exception may leave the process in an
  // inconsistent state. Exit so the process manager can restart it.
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error("❌ Unhandled Rejection:", error);

  // Terminate gracefully rather than continue in an unknown state.
  server.close(() => {
    io.close(() => {
      process.exit(1);
    });
  });

  // Avoid hanging indefinitely if connections do not close.
  setTimeout(() => {
    process.exit(1);
  }, 10000).unref();
});

/* ==========================================================
   GRACEFUL SHUTDOWN
========================================================== */

let isShuttingDown = false;

const shutdown = (signal) => {
  if (isShuttingDown) return;

  isShuttingDown = true;

  console.log(`\n${signal} received. Shutting down...`);

  server.close(() => {
    console.log("✅ HTTP server closed");

    io.close(() => {
      console.log("✅ Socket.IO closed");
      process.exit(0);
    });
  });

  setTimeout(() => {
    console.error("⚠️ Forced shutdown after timeout");
    process.exit(1);
  }, 10000).unref();
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

/* ==========================================================
   START SERVER
========================================================== */

server.listen(PORT, () => {
  console.log("=======================================");
  console.log("🚀 Mentor-Mentee Backend Started");
  console.log(`🌐 Server      : http://localhost:${PORT}`);
  console.log(
    `📦 Environment : ${process.env.NODE_ENV || "development"}`
  );
  console.log("💬 Socket.IO   : Enabled");
  console.log("=======================================");
});

/* ==========================================================
   EXPORTS
========================================================== */

// Useful if another server module needs these instances.
export { server, io };