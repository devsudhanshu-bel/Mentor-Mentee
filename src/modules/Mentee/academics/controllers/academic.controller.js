import asyncHandler from "../../../../utils/asyncHandler.js";
import ApiResponse from "../../../../utils/ApiResponse.js";

import academicService from "../services/academic.service.js";

/* ==========================================================
   ACADEMIC CONTROLLER
========================================================== */

class AcademicController {
  /* ========================================================
     GET ACADEMIC PROFILE
  ======================================================== */

  getProfile = asyncHandler(async (req, res) => {
    const data = await academicService.getProfile(req.user.id);

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Academic profile fetched successfully", data),
      );
  });

  /* ========================================================
     GET SINGLE SEMESTER
  ======================================================== */

  getSemester = asyncHandler(async (req, res) => {
    const data = await academicService.getSemester(
      req.user.id,
      req.params.semesterNumber,
    );

    return res
      .status(200)
      .json(new ApiResponse(200, "Semester fetched successfully", data));
  });

  /* ========================================================
     SAVE SEMESTER ACADEMIC DATA
  ======================================================== */

  saveSemester = asyncHandler(async (req, res) => {
    const data = await academicService.saveSemester(req.user.id, req.body);

    return res
      .status(201)
      .json(new ApiResponse(201, "Academic semester saved successfully", data));
  });

  /* ========================================================
     UPDATE SEMESTER ACADEMIC DATA
  ======================================================== */

  updateSemester = asyncHandler(async (req, res) => {
    const semesterNumber = Number(req.params.semesterNumber);

    const data = await academicService.updateSemester(
      req.user.id,
      semesterNumber,
      req.body,
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          `Semester ${semesterNumber} updated successfully`,
          data,
        ),
      );
  });

  /* ========================================================
     GET BACKLOGS
  ======================================================== */

  getBacklogs = asyncHandler(async (req, res) => {
    const data = await academicService.getBacklogs(req.user.id);

    return res
      .status(200)
      .json(new ApiResponse(200, "Backlogs fetched successfully", data));
  });

  /* ========================================================
     CREATE BACKLOG
  ======================================================== */

  createBacklog = asyncHandler(async (req, res) => {
    const data = await academicService.createBacklog(req.user.id, req.body);

    return res
      .status(201)
      .json(new ApiResponse(201, "Backlog added successfully", data));
  });

  /* ========================================================
     UPDATE BACKLOG
  ======================================================== */

  updateBacklog = asyncHandler(async (req, res) => {
    const data = await academicService.updateBacklog(
      req.user.id,
      req.params.id,
      req.body,
    );

    return res
      .status(200)
      .json(new ApiResponse(200, "Backlog updated successfully", data));
  });

  /* ========================================================
     DELETE BACKLOG
  ======================================================== */

  deleteBacklog = asyncHandler(async (req, res) => {
    const data = await academicService.deleteBacklog(
      req.user.id,
      req.params.id,
    );

    return res
      .status(200)
      .json(new ApiResponse(200, "Backlog removed successfully", data));
  });

  /* ========================================================
     CLEAR BACKLOG
  ======================================================== */

  clearBacklog = asyncHandler(async (req, res) => {
    const data = await academicService.clearBacklog(
      req.user.id,
      req.params.id,
      req.body,
    );

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Backlog marked as cleared successfully", data),
      );
  });
}

/* ==========================================================
   EXPORT
========================================================== */

export default new AcademicController();
