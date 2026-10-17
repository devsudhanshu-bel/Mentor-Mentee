import {
  getMentorDetailsById,
  getMentorAssignedStudentsByMentorId,
  getMentorMeetingsByMentorId,
} from "../services/mentorDetails.service.js";

// ==========================================================
// GET MENTOR DETAILS (ADMIN)
// GET /api/admin/mentors/:mentorId
// ==========================================================

export const getMentorDetails = async (req, res, next) => {
  try {
    const { mentorId } = req.params;

    const data = await getMentorDetailsById(mentorId);

    return res.status(200).json({
      success: true,
      message: "Mentor details retrieved successfully.",
      data,
    });
  } catch (error) {
    return next(error);
  }
};

// ==========================================================
// GET STUDENTS ASSIGNED TO A MENTOR (ADMIN)
// GET /api/admin/mentors/:mentorId/students
// ==========================================================

export const getMentorAssignedStudents = async (
  req,
  res,
  next
) => {
  try {
    const { mentorId } = req.params;

    const data = await getMentorAssignedStudentsByMentorId(
      mentorId
    );

    return res.status(200).json({
      success: true,
      message: "Assigned students retrieved successfully.",
      data,
    });
  } catch (error) {
    return next(error);
  }
};

// ==========================================================
// GET MEETINGS FOR A SPECIFIC MENTOR (ADMIN)
// GET /api/admin/mentors/:mentorId/meetings
// ==========================================================

export const getMentorMeetings = async (req, res, next) => {
  try {
    const { mentorId } = req.params;

    const data = await getMentorMeetingsByMentorId(mentorId);

    return res.status(200).json({
      success: true,
      message: "Mentor meetings retrieved successfully.",
      data,
    });
  } catch (error) {
    return next(error);
  }
};