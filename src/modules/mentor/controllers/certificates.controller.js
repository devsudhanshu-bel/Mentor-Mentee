import certificatesService from "../services/certificates.service.js";

class MentorCertificatesController {
  // GET /api/mentor/students/:studentId/certificates

  async getDocuments(req, res, next) {
    try {
      const result =
        await certificatesService.getCertificateDocuments(
          req.user.id,
          req.params.studentId
        );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "MentorCertificatesController.getDocuments error:",
        error
      );

      next(error);
    }
  }

  // GET /api/mentor/students/:studentId/certificates/dashboard

  async getDashboard(req, res, next) {
    try {
      const result = await certificatesService.getDashboard(
        req.user.id,
        req.params.studentId
      );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "MentorCertificatesController.getDashboard error:",
        error
      );

      next(error);
    }
  }

  // GET /api/mentor/students/:studentId/certificates/:documentId

  async getDocumentById(req, res, next) {
    try {
      const result =
        await certificatesService.getDocumentById(
          req.user.id,
          req.params.studentId,
          req.params.documentId
        );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "MentorCertificatesController.getDocumentById error:",
        error
      );

      next(error);
    }
  }

  // PATCH /api/mentor/students/:studentId/certificates/:documentId/review

  async reviewDocument(req, res, next) {
    try {
      const result = await certificatesService.reviewDocument(
        req.user.id,
        req.params.studentId,
        req.params.documentId,
        req.body
      );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "MentorCertificatesController.reviewDocument error:",
        error
      );

      next(error);
    }
  }
}

export default new MentorCertificatesController();