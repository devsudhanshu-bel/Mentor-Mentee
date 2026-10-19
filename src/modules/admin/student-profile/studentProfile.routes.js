import { Router } from "express";
import { authenticate } from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";
import Controller from "./studentProfile.controller.js";
import StudentReportController from "../../mentor/controllers/studentReport.controller.js";

const router = Router();

// All endpoints are read/review endpoints scoped to a concrete student or record.
// Only authenticated Admin/HOD accounts can use this namespace.
router.use(authenticate, authorize("ADMIN", "SYSTEM_ADMIN"));

// Internship routes must precede the generic :studentId/:resource routes.
router.get("/internships/initial", (req, res, next) => {
  req.params.stage = "initial";
  return Controller.getInternshipQueue(req, res, next);
});
router.get("/internships/completion", (req, res, next) => {
  req.params.stage = "completion";
  return Controller.getInternshipQueue(req, res, next);
});
router.get("/internships/student/:studentId", Controller.getInternships);
router.get("/internships/:internshipId", Controller.getInternshipById);
router.patch("/internships/:internshipId/initial-review", (req, res, next) => {
  req.params.stage = "initial";
  return Controller.reviewInternship(req, res, next);
});
router.patch("/internships/:internshipId/completion-review", (req, res, next) => {
  req.params.stage = "completion";
  return Controller.reviewInternship(req, res, next);
});

router.get("/:studentId/report", StudentReportController.download);

// Student overview adjunct data.
router.get("/:studentId/meetings", (req, res, next) => {
  req.params.resource = "meetings";
  return Controller.listDocuments(req, res, next);
});
router.get("/:studentId/attendance", (req, res, next) => {
  req.params.resource = "attendance";
  return Controller.listDocuments(req, res, next);
});
router.get("/:studentId/academics", (req, res, next) => {
  req.params.resource = "academics";
  return Controller.listDocuments(req, res, next);
});
router.get("/:studentId/academics/semester/:semesterNumber", Controller.getAcademicSemester);

// Dashboard endpoints.
router.get("/:studentId/:resource/dashboard", Controller.dashboard);

// Category-specific read/review endpoints.
router.patch("/:studentId/:resource/:documentId/review", Controller.reviewDocument);
router.get("/:studentId/:resource/:documentId", Controller.getDocument);
router.get("/:studentId/:resource", Controller.listDocuments);

export default router;
