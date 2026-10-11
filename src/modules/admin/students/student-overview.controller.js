import StudentOverviewService from "./student-overview.service.js";
import asyncHandler from "../../../utils/asyncHandler.js";
import ApiResponse from "../../../utils/ApiResponse.js";

class StudentOverviewController {
  getOverview = asyncHandler(async (req, res) => {
    const { studentId } = req.params;

    const overview = await StudentOverviewService.getOverview(studentId);

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Student overview fetched successfully", overview),
      );
  });
}

export default new StudentOverviewController();
