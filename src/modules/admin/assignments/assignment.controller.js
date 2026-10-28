import AssignmentService from "./assignment.service.js";

// ============================================================
// ASSIGNMENT CONTROLLER
// ============================================================

class AssignmentController {
  // ==========================================================
  // GET ASSIGNMENT CONTEXT
  // ==========================================================

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

  // ==========================================================
  // ASSIGN STUDENTS
  // ==========================================================

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

  // ==========================================================
  // BULK ASSIGN FROM PDF
  // ==========================================================

  bulkAssignFromPdf = async (req, res, next) => {
    try {
      if (!req.file?.buffer) {
        const error = new Error("Please select a student-list PDF.");
        error.statusCode = 400;
        throw error;
      }

      const { teacherId, termId, assignedBy } = req.body || {};

      const result = await AssignmentService.bulkAssignFromPdf({
        buffer: req.file.buffer,
        teacherId,
        termId,
        assignedBy,
      });

      return res.status(201).json({
        success: true,
        message: result.message,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  // ==========================================================
  // GET ALL ASSIGNMENTS
  // ==========================================================

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

  // ==========================================================
  // GET ASSIGNMENT HISTORY
  // ==========================================================

  getAssignmentHistory = async (req, res, next) => {
    try {
      const { termId, departmentId, teacherId, search, status } = req.query;
      const history = await AssignmentService.getAssignmentHistory({
        termId, departmentId, teacherId, search, status,
      });
      return res.status(200).json({
        success: true,
        message: "Assignment history fetched successfully",
        data: history,
      });
    } catch (error) {
      next(error);
    }
  };

  // ==========================================================
  // REMOVE ACTIVE ASSIGNMENT
  // ==========================================================

  removeAssignment = async (req, res, next) => {
    try {
      const { assignmentId } = req.params;

      if (!assignmentId?.trim()) {
        const error = new Error("Assignment ID is required.");
        error.statusCode = 400;
        throw error;
      }

      const result = await AssignmentService.removeAssignment(assignmentId);

      return res.status(200).json({
        success: true,
        message: result.message,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new AssignmentController();
