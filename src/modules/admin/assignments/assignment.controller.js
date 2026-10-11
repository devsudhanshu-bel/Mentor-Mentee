import AssignmentService from "./assignment.service.js";

// ============================================================
// ASSIGNMENT CONTROLLER
// ============================================================

class AssignmentController {
  // ============================================================
  // GET ASSIGNMENT CONTEXT
  // ============================================================
  //
  // GET:
  // /api/admin/assignments/context
  //
  // Query parameters:
  //
  // academicYear
  // academicYearId
  // termId
  // departmentId
  // semesterNumber
  // section
  //
  // ============================================================

  getAssignmentContext = async (req, res, next) => {
    try {
      const {
        academicYear,
        academicYearId,
        termId,
        departmentId,
        semesterNumber,
        section,
      } = req.query;

      const context = await AssignmentService.getAssignmentContext({
        academicYear,
        academicYearId,
        termId,
        departmentId,
        semesterNumber,
        section,
      });

      return res.status(200).json({
        success: true,
        message: "Assignment context fetched successfully",
        data: context,
      });
    } catch (error) {
      next(error);
    }
  };

  // ============================================================
  // ASSIGN STUDENTS
  // ============================================================
  //
  // POST:
  // /api/admin/assignments
  //
  // Body:
  //
  // {
  //   studentIds: [],
  //   teacherId: "",
  //   termId: "",
  //   assignedBy: ""
  // }
  //
  // ============================================================

  assignStudents = async (req, res, next) => {
    try {
      const { studentIds, teacherId, termId, assignedBy } = req.body;

      const result = await AssignmentService.assignStudents({
        studentIds,
        teacherId,
        termId,
        assignedBy,
      });

      return res.status(201).json({
        success: true,
        message: result.message || "Students assigned successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  // ============================================================
  // GET ALL ASSIGNMENTS
  // ============================================================
  //
  // GET:
  // /api/admin/assignments
  //
  // Query:
  //
  // termId
  // departmentId
  // teacherId
  // search
  //
  // ============================================================

  getAllAssignments = async (req, res, next) => {
    try {
      const { termId, departmentId, teacherId, search } = req.query;

      const assignments = await AssignmentService.getAllAssignments({
        termId,
        departmentId,
        teacherId,
        search,
      });

      return res.status(200).json({
        success: true,
        message: "Assignments fetched successfully",
        data: assignments,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new AssignmentController();
