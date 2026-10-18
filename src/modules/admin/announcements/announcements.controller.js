
import AnnouncementsService from "./announcements.service.js";
import ApiResponse from "../../../utils/ApiResponse.js";

const getUserId = (req) =>
  req.user?.id ||
  req.user?.userId ||
  req.user?.userAccountId;

const handleError = (res, error) => {
  const statusCode = error.statusCode || 500;

  if (statusCode >= 500) {
    console.error("Announcements API error:", error);
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message:
      statusCode >= 500
        ? "An unexpected error occurred."
        : error.message,
    data: null,
  });
};

class AnnouncementsController {
  async createAnnouncement(req, res) {
    try {
      const announcement =
        await AnnouncementsService.createAnnouncement(
          getUserId(req),
          req.body
        );

      return res
        .status(201)
        .json(
          new ApiResponse(
            201,
            "Announcement published successfully.",
            announcement
          )
        );
    } catch (error) {
      return handleError(res, error);
    }
  }

  async getAnnouncements(req, res) {
    try {
      const result = await AnnouncementsService.getAnnouncements(
        getUserId(req),
        req.query
      );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Announcements fetched successfully.",
            result
          )
        );
    } catch (error) {
      return handleError(res, error);
    }
  }

  async getAnnouncementById(req, res) {
    try {
      const announcement =
        await AnnouncementsService.getAnnouncementById(
          getUserId(req),
          req.params.id
        );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Announcement fetched successfully.",
            announcement
          )
        );
    } catch (error) {
      return handleError(res, error);
    }
  }

  async archiveAnnouncement(req, res) {
    try {
      const announcement =
        await AnnouncementsService.archiveAnnouncement(
          getUserId(req),
          req.params.id
        );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Announcement archived successfully.",
            announcement
          )
        );
    } catch (error) {
      return handleError(res, error);
    }
  }
}

export default new AnnouncementsController();
