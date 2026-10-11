import researchService from "../services/research.service.js";

class MentorResearchController {
  // ==========================================================
  // GET RESEARCH DOCUMENTS
  // GET /api/mentor/students/:studentId/research
  // ==========================================================

  async getDocuments(req, res, next) {
    try {
      const result = await researchService.getResearchDocuments(
        req.user.id,
        req.params.studentId
      );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "MentorResearchController.getDocuments error:",
        error
      );

      next(error);
    }
  }

  // ==========================================================
  // GET RESEARCH DASHBOARD
  // GET /api/mentor/students/:studentId/research/dashboard
  // ==========================================================

  async getDashboard(req, res, next) {
    try {
      const result = await researchService.getDashboard(
        req.user.id,
        req.params.studentId
      );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "MentorResearchController.getDashboard error:",
        error
      );

      next(error);
    }
  }

  // ==========================================================
  // GET SINGLE RESEARCH DOCUMENT
  // GET /api/mentor/students/:studentId/research/:documentId
  // ==========================================================

  async getDocumentById(req, res, next) {
    try {
      const result = await researchService.getDocumentById(
        req.user.id,
        req.params.studentId,
        req.params.documentId
      );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "MentorResearchController.getDocumentById error:",
        error
      );

      next(error);
    }
  }

  // ==========================================================
  // REVIEW RESEARCH DOCUMENT
  // PATCH /api/mentor/students/:studentId/research/:documentId/review
  // ==========================================================

  async reviewDocument(req, res, next) {
    try {
      const result = await researchService.reviewDocument(
        req.user.id,
        req.params.studentId,
        req.params.documentId,
        req.body
      );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "MentorResearchController.reviewDocument error:",
        error
      );

      next(error);
    }
  }
}

export default new MentorResearchController();