import StudentsService from "../services/students.service.js";

import ApiResponse from "../../../utils/ApiResponse.js";

import asyncHandler from "../../../utils/asyncHandler.js";

class StudentsController {
  /* ==========================================================
     GET MY STUDENTS
  ========================================================== */

  getMyStudents = asyncHandler(
    async (req, res) => {
      const students =
        await StudentsService.getMyStudents(
          req.user.id
        );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Students fetched successfully",
            students
          )
        );
    }
  );
}

export default new StudentsController();