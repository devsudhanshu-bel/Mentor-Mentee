import asyncHandler from "../../../../utils/asyncHandler.js";
import ApiResponse from "../../../../utils/ApiResponse.js";
import academicService from "../services/academic.service.js";

class AcademicController {
  // =========================================================
  // EXISTING ACADEMIC APIs
  // =========================================================

  /**
   * GET /mentee/academics
   */
  getProfile = asyncHandler(async (req, res) => {
    const data = await academicService.getProfile(req.user.id);

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Academic profile fetched successfully", data),
      );
  });

  /**
   * GET /mentee/academics/semester/:semesterNumber
   */
  getSemester = asyncHandler(async (req, res) => {
    const data = await academicService.getSemester(
      req.user.id,
      req.params.semesterNumber,
    );

    return res
      .status(200)
      .json(new ApiResponse(200, "Semester fetched successfully", data));
  });

  /**
   * POST /mentee/academics/semester
   *
   * Used for initially saving semester academic details.
   */
  saveSemester = asyncHandler(async (req, res) => {
    const data = await academicService.saveSemester(req.user.id, req.body);

    return res
      .status(201)
      .json(new ApiResponse(201, "Academic semester saved successfully", data));
  });

  /**
   * PUT /mentee/academics/semester/:semesterNumber
   *
   * Used when a student edits an already saved semester.
   *
   * The semester number comes from the URL so that:
   *
   * PUT /semester/1
   * -> edits Semester I
   *
   * PUT /semester/2
   * -> edits Semester II
   *
   * PUT /semester/6
   * -> edits Semester VI
   */
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
