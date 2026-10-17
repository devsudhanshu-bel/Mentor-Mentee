
import * as internshipService from "../services/internship.service.js";
import asyncHandler from "../../../../utils/asyncHandler.js";

const createInternship = asyncHandler(async (req, res) => {
  const data = await internshipService.createInternship(
    req.user.id,
    req.body,
  );

  res.status(201).json({
    success: true,
    message: "Internship created successfully. Upload the required documents for verification.",
    data,
  });
});

const getMyInternships = asyncHandler(async (req, res) => {
  const data = await internshipService.getMyInternships(req.user.id);

  res.status(200).json({
    success: true,
    message: "Internships fetched successfully",
    data,
  });
});

const getInternshipById = asyncHandler(async (req, res) => {
  const data = await internshipService.getInternshipById(
    req.user.id,
    req.params.id,
  );

  res.status(200).json({
    success: true,
    message: "Internship fetched successfully",
    data,
  });
});

const uploadDocument = asyncHandler(async (req, res) => {
  const data = await internshipService.uploadInternshipDocument(
    req.user.id,
    req.params.id,
    req.body,
    req.file,
  );

  res.status(201).json({
    success: true,
    message: "Internship document uploaded successfully",
    data,
  });
});

const deleteDocument = asyncHandler(async (req, res) => {
  const data = await internshipService.deleteInternshipDocument(
    req.user.id,
    req.params.id,
    req.params.documentId,
  );

  res.status(200).json({
    success: true,
    ...data,
  });
});

const requestCompletion = asyncHandler(async (req, res) => {
  const data = await internshipService.requestCompletion(
    req.user.id,
    req.params.id,
    req.body,
  );

  res.status(200).json({
    success: true,
    message: "Completion submitted for mentor verification",
    data,
  });
});

const InternshipController = {
  createInternship,
  getMyInternships,
  getInternshipById,
  uploadDocument,
  deleteDocument,
  requestCompletion,
};

export default InternshipController;
