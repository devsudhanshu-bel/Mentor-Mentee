
import extraCurricularService from "../services/extraCurricular.service.js";

class MentorExtraCurricularController {
  // GET /api/mentor/students/:studentId/extra-curricular
  async getDocuments(req, res, next) {
    try {
      const result =
        await extraCurricularService.getExtraCurricularDocuments(
          req.user.id,
          req.params.studentId
        );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "MentorExtraCurricularController.getDocuments error:",
        error
      );

      next(error);
    }
  }

  // GET /api/mentor/students/:studentId/extra-curricular/dashboard
  async getDashboard(req, res, next) {
    try {
      const result = await extraCurricularService.getDashboard(
        req.user.id,
        req.params.studentId
      );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "MentorExtraCurricularController.getDashboard error:",
        error
      );

      next(error);
    }
  }

  // GET /api/mentor/students/:studentId/extra-curricular/:documentId
  async getDocumentById(req, res, next) {
    try {
      const result =
        await extraCurricularService.getDocumentById(
          req.user.id,
          req.params.studentId,
          req.params.documentId
        );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "MentorExtraCurricularController.getDocumentById error:",
        error
      );

      next(error);
    }
  }

  // PATCH /api/mentor/students/:studentId/extra-curricular/:documentId/review
  async reviewDocument(req, res, next) {
    try {
      const result =
        await extraCurricularService.reviewDocument(
          req.user.id,
          req.params.studentId,
          req.params.documentId,
          req.body
        );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "MentorExtraCurricularController.reviewDocument error:",
        error
      );

      next(error);
    }
  }
}

export default new MentorExtraCurricularController();
