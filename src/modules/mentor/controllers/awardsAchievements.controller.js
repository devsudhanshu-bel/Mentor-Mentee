
import awardsAchievementsService from "../services/awardsAchievements.service.js";

class MentorAwardsAchievementsController {
  // GET /api/mentor/students/:studentId/awards-achievements
  async getDocuments(req, res, next) {
    try {
      const result =
        await awardsAchievementsService.getAwardsAchievementsDocuments(
          req.user.id,
          req.params.studentId
        );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "MentorAwardsAchievementsController.getDocuments error:",
        error
      );

      next(error);
    }
  }

  // GET /api/mentor/students/:studentId/awards-achievements/dashboard
  async getDashboard(req, res, next) {
    try {
      const result =
        await awardsAchievementsService.getDashboard(
          req.user.id,
          req.params.studentId
        );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "MentorAwardsAchievementsController.getDashboard error:",
        error
      );

      next(error);
    }
  }

  // GET /api/mentor/students/:studentId/awards-achievements/:documentId
  async getDocumentById(req, res, next) {
    try {
      const result =
        await awardsAchievementsService.getDocumentById(
          req.user.id,
          req.params.studentId,
          req.params.documentId
        );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "MentorAwardsAchievementsController.getDocumentById error:",
        error
      );

      next(error);
    }
  }

  // PATCH /api/mentor/students/:studentId/awards-achievements/:documentId/review
  async reviewDocument(req, res, next) {
    try {
      const result =
        await awardsAchievementsService.reviewDocument(
          req.user.id,
          req.params.studentId,
          req.params.documentId,
          req.body
        );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "MentorAwardsAchievementsController.reviewDocument error:",
        error
      );

      next(error);
    }
  }
}

export default new MentorAwardsAchievementsController();
