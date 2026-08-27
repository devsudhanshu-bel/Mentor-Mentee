import documentService from "../services/document.service.js";

class DocumentController {
  // ==========================================================
  // UPLOAD DOCUMENT
  // POST /api/mentee/documents
  // ==========================================================

  async uploadDocument(req, res, next) {
    try {
      const result = await documentService.uploadDocument(
        req.user.id,
        req.body,
        req.file
      );

      return res.status(201).json(result);
    } catch (error) {
      console.error(
        "DocumentController.uploadDocument error:",
        error
      );

      next(error);
    }
  }

  // ==========================================================
  // GET DOCUMENT DASHBOARD
  // GET /api/mentee/documents/dashboard
  //
  // Optional query:
  // ?category=RESEARCH
  // ?category=AWARDS
  // ?category=PROJECTS
  // etc.
  //
  // If category is not provided, returns all documents.
  // ==========================================================

  async getDashboard(req, res, next) {
    try {
      const category = req.query.category || null;

      const result = await documentService.getDashboard(
        req.user.id,
        category
      );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "DocumentController.getDashboard error:",
        error
      );

      next(error);
    }
  }

  // ==========================================================
  // GET SINGLE DOCUMENT
  // GET /api/mentee/documents/:documentId
  // ==========================================================

  async getDocumentById(req, res, next) {
    try {
      const result =
        await documentService.getDocumentById(
          req.user.id,
          req.params.documentId
        );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "DocumentController.getDocumentById error:",
        error
      );

      next(error);
    }
  }

  // ==========================================================
  // UPDATE DOCUMENT
  // PUT /api/mentee/documents/:documentId
  // ==========================================================

  async updateDocument(req, res, next) {
    try {
      const result =
        await documentService.updateDocument(
          req.user.id,
          req.params.documentId,
          req.body,
          req.file
        );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "DocumentController.updateDocument error:",
        error
      );

      next(error);
    }
  }

  // ==========================================================
  // DELETE DOCUMENT
  // DELETE /api/mentee/documents/:documentId
  // ==========================================================

  async deleteDocument(req, res, next) {
    try {
      const result =
        await documentService.deleteDocument(
          req.user.id,
          req.params.documentId
        );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "DocumentController.deleteDocument error:",
        error
      );

      next(error);
    }
  }
}

export default new DocumentController();