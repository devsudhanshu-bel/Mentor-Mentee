import asyncHandler from "../../../../utils/asyncHandler.js";
import ApiResponse from "../../../../utils/ApiResponse.js";
import academicService from "../services/academic.service.js";

class AcademicController {
  // =========================================================
  // EXISTING ACADEMIC APIs
  // =========================================================

  getProfile = asyncHandler(async (req, res) => {
    const data = await academicService.getProfile(req.user.id);

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Academic profile fetched successfully", data),
      );
  });

  getSemester = asyncHandler(async (req, res) => {
    const data = await academicService.getSemester(
      req.user.id,
      req.params.semesterNumber,
    );

    return res
      .status(200)
      .json(new ApiResponse(200, "Semester fetched successfully", data));
  });

  saveSemester = asyncHandler(async (req, res) => {
    const data = await academicService.saveSemester(req.user.id, req.body);

    return res
      .status(201)
      .json(new ApiResponse(201, "Academic semester saved successfully", data));
  });

  // =========================================================
  // BACKLOG APIs
  // =========================================================

  /**
   * GET /mentee/academics/backlogs
   */
  getBacklogs = asyncHandler(async (req, res) => {
    const data = await academicService.getBacklogs(req.user.id);

    return res
      .status(200)
      .json(new ApiResponse(200, "Backlogs fetched successfully", data));
  });

  /**
   * POST /mentee/academics/backlogs
   */
  createBacklog = asyncHandler(async (req, res) => {
    const data = await academicService.createBacklog(req.user.id, req.body);

    return res
      .status(201)
      .json(new ApiResponse(201, "Backlog added successfully", data));
  });

  /**
   * PUT /mentee/academics/backlogs/:id
   */
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

  /**
   * DELETE /mentee/academics/backlogs/:id
   */
  deleteBacklog = asyncHandler(async (req, res) => {
    const data = await academicService.deleteBacklog(
      req.user.id,
      req.params.id,
    );

    return res
      .status(200)
      .json(new ApiResponse(200, "Backlog removed successfully", data));
  });

  /**
   * PATCH /mentee/academics/backlogs/:id/clear
   */
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

export default new AcademicController();
