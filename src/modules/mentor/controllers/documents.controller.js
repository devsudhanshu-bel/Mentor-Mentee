import documentsService from "../services/documents.service.js";

class MentorDocumentsController {
  // GET /api/mentor/students/:studentId/documents
  async getDocuments(req, res, next) {
    try {
      const result = await documentsService.getDocuments(
        req.user.id,
        req.params.studentId,
        {
          category: req.query.category,
          fileType: req.query.fileType,
          search: req.query.search,
          page: req.query.page,
          limit: req.query.limit,
        }
      );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "MentorDocumentsController.getDocuments error:",
        error
      );

      next(error);
    }
  }

  // GET /api/mentor/students/:studentId/documents/dashboard
  async getDashboard(req, res, next) {
    try {
      const result = await documentsService.getDashboard(
        req.user.id,
        req.params.studentId
      );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "MentorDocumentsController.getDashboard error:",
        error
      );

      next(error);
    }
  }

  // GET /api/mentor/students/:studentId/documents/:documentId
  async getDocumentById(req, res, next) {
    try {
      const result = await documentsService.getDocumentById(
        req.user.id,
        req.params.studentId,
        req.params.documentId
      );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "MentorDocumentsController.getDocumentById error:",
        error
      );

      next(error);
    }
  }
}

export default new MentorDocumentsController();