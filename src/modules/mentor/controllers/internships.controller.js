
import asyncHandler from "../../../utils/asyncHandler.js";
import ApiResponse from "../../../utils/ApiResponse.js";
import internshipService from "../services/internships.service.js";

class MentorInternshipsController {
  // =========================================================
  // GET: INITIAL VERIFICATION QUEUE
  // GET /api/mentor/internships/initial
  // =========================================================
  getInitialQueue = asyncHandler(async (req, res) => {
    const mentorUserId = req.user?.id;

    if (!mentorUserId) {
      return res
        .status(401)
        .json(new ApiResponse(401, "Authentication required", null));
    }

    const data = await internshipService.getInitialQueue(mentorUserId);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Initial internship verification queue fetched successfully",
        data
      )
    );
  });

  // =========================================================
  // GET: COMPLETION VERIFICATION QUEUE
  // GET /api/mentor/internships/completion
  // =========================================================
  getCompletionQueue = asyncHandler(async (req, res) => {
    const mentorUserId = req.user?.id;

    if (!mentorUserId) {
      return res
        .status(401)
        .json(new ApiResponse(401, "Authentication required", null));
    }

    const data =
      await internshipService.getCompletionQueue(mentorUserId);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Internship completion queue fetched successfully",
        data
      )
    );
  });

  // =========================================================
  // GET: ALL INTERNSHIPS FOR AN ASSIGNED STUDENT
  // GET /api/mentor/internships/student/:studentId
  // =========================================================
  getStudentInternships = asyncHandler(async (req, res) => {
    const mentorUserId = req.user?.id;
    const { studentId } = req.params;

    if (!mentorUserId) {
      return res
        .status(401)
        .json(new ApiResponse(401, "Authentication required", null));
    }

    if (!studentId) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Student ID is required", null));
    }

    const data = await internshipService.getStudentInternships(
      mentorUserId,
      studentId
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Student internships fetched successfully",
        data
      )
    );
  });

  // =========================================================
  // GET: SINGLE INTERNSHIP DETAILS
  // GET /api/mentor/internships/:id
  // =========================================================
  getInternshipDetails = asyncHandler(async (req, res) => {
    const mentorUserId = req.user?.id;
    const { id } = req.params;

    if (!mentorUserId) {
      return res
        .status(401)
        .json(new ApiResponse(401, "Authentication required", null));
    }

    const data = await internshipService.getInternshipDetails(
      mentorUserId,
      id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Internship details fetched successfully",
        data
      )
    );
  });

  // =========================================================
  // PATCH: INITIAL VERIFICATION DECISION
  // PATCH /api/mentor/internships/:id/initial-review
  // =========================================================
  reviewInitial = asyncHandler(async (req, res) => {
    const mentorUserId = req.user?.id;
    const { id } = req.params;

    if (!mentorUserId) {
      return res
        .status(401)
        .json(new ApiResponse(401, "Authentication required", null));
    }

    const data = await internshipService.reviewInitial(
      mentorUserId,
      id,
      req.body
    );

    const message =
      req.body?.decision === "APPROVED"
        ? "Initial internship verification approved"
        : "Initial internship verification rejected";

    return res.status(200).json(
      new ApiResponse(200, message, data)
    );
  });

  // =========================================================
  // PATCH: COMPLETION VERIFICATION DECISION
  // PATCH /api/mentor/internships/:id/completion-review
  // =========================================================
  reviewCompletion = asyncHandler(async (req, res) => {
    const mentorUserId = req.user?.id;
    const { id } = req.params;

    if (!mentorUserId) {
      return res
        .status(401)
        .json(new ApiResponse(401, "Authentication required", null));
    }

    const data = await internshipService.reviewCompletion(
      mentorUserId,
      id,
      req.body
    );

    const message =
      req.body?.decision === "APPROVED"
        ? "Internship completion approved"
        : "Internship completion rejected";

    return res.status(200).json(
      new ApiResponse(200, message, data)
    );
  });

  // =========================================================
  // GET: INTERNSHIP REVIEW HISTORY
  // GET /api/mentor/internships/:id/reviews
  // =========================================================
  getReviewHistory = asyncHandler(async (req, res) => {
    const mentorUserId = req.user?.id;
    const { id } = req.params;

    if (!mentorUserId) {
      return res
        .status(401)
        .json(new ApiResponse(401, "Authentication required", null));
    }

    const data = await internshipService.getReviewHistory(
      mentorUserId,
      id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Internship review history fetched successfully",
        data
      )
    );
  });
}

export default new MentorInternshipsController();
