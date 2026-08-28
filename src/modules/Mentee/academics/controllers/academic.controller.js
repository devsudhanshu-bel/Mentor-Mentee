import asyncHandler from "../../../../utils/asyncHandler.js";
import ApiResponse from "../../../../utils/ApiResponse.js";
import academicService from "../services/academic.service.js";

class AcademicController {
  getProfile = asyncHandler(async (req, res) => {
    const data = await academicService.getProfile(req.user.id);
    return res.status(200).json(new ApiResponse(200, "Academic profile fetched successfully", data));
  });

  getSemester = asyncHandler(async (req, res) => {
    const data = await academicService.getSemester(req.user.id, req.params.semesterNumber);
    return res.status(200).json(new ApiResponse(200, "Semester fetched successfully", data));
  });

  saveSemester = asyncHandler(async (req, res) => {
    const data = await academicService.saveSemester(req.user.id, req.body);
    return res.status(201).json(new ApiResponse(201, "Academic semester saved successfully", data));
  });
}

export default new AcademicController();
