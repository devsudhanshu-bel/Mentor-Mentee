
import cocurricularService from "../services/cocurricular.service.js";

class MentorCoCurricularController {
  // GET /api/mentor/students/:studentId/cocurricular
  async getDocuments(req, res, next) {
    try {
      const result =
        await cocurricularService.getCoCurricularDocuments(
          req.user.id,
          req.params.studentId
        );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "MentorCoCurricularController.getDocuments error:",
        error
      );

      next(error);
    }
  }

  // GET /api/mentor/students/:studentId/cocurricular/dashboard
  async getDashboard(req, res, next) {
    try {
      const result = await cocurricularService.getDashboard(
        req.user.id,
        req.params.studentId
      );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "MentorCoCurricularController.getDashboard error:",
        error
      );

      next(error);
    }
  }

  // GET /api/mentor/students/:studentId/cocurricular/:documentId
  async getDocumentById(req, res, next) {
    try {
      const result =
        await cocurricularService.getDocumentById(
          req.user.id,
          req.params.studentId,
          req.params.documentId
        );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "MentorCoCurricularController.getDocumentById error:",
        error
      );

      next(error);
    }
  }

  // PATCH /api/mentor/students/:studentId/cocurricular/:documentId/review
  async reviewDocument(req, res, next) {
    try {
      const result = await cocurricularService.reviewDocument(
        req.user.id,
        req.params.studentId,
        req.params.documentId,
        req.body
      );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "MentorCoCurricularController.reviewDocument error:",
        error
      );

      next(error);
    }
  }
}

export default new MentorCoCurricularController();
