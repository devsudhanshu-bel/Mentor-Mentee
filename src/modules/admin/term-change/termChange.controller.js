import TermChangeService from "./termChange.service.js";

class TermChangeController {
  /* ========================================================
     HOD / ADMIN
     GET TERM CHANGE CONTEXT
  ======================================================== */

  getContext = async (req, res, next) => {
    try {
      const context = await TermChangeService.getTermChangeContext();

      return res.status(200).json({
        success: true,
        message: "Term change context fetched successfully",
        data: context,
      });
    } catch (error) {
      next(error);
    }
  };

  /* ========================================================
     HOD / ADMIN
     CREATE TERM CHANGE REQUEST
  ======================================================== */

  createRequest = async (req, res, next) => {
    try {
      const { requestedStartDate, requestedEndDate } = req.body;

      /*
       * authenticate middleware already populated req.user.
       *
       * The middleware stores the authenticated user object
       * after removing the password.
       */

      const requestedBy =
        req.user?.id ||
        req.user?.userId ||
        req.user?.userAccountId ||
        req.user?.email ||
        req.user?.username;

      if (!requestedBy) {
        return res.status(401).json({
          success: false,
          message: "Unable to identify the requesting administrator",
        });
      }

      const result = await TermChangeService.createRequest({
        requestedStartDate,
        requestedEndDate,
        requestedBy,
      });

      return res.status(201).json({
        success: true,
        message: "Term change request submitted successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  /* ========================================================
     SYSTEM ADMIN
     GET ALL TERM CHANGE REQUESTS
  ======================================================== */

  getRequests = async (req, res, next) => {
    try {
      const requests = await TermChangeService.getAllRequests();

      return res.status(200).json({
        success: true,
        message: "Term change requests fetched successfully",
        data: requests,
      });
    } catch (error) {
      next(error);
    }
  };

  /* ========================================================
     SYSTEM ADMIN
     APPROVE REQUEST
  ======================================================== */

  approveRequest = async (req, res, next) => {
    try {
      const { requestId } = req.params;

      const { reviewComment } = req.body || {};

      /*
       * authenticate middleware guarantees req.user
       * for this endpoint.
       */

      const reviewedBy =
        req.user?.id ||
        req.user?.userId ||
        req.user?.userAccountId ||
        req.user?.email ||
        req.user?.username;

      if (!reviewedBy) {
        return res.status(401).json({
          success: false,
          message: "Unable to identify the reviewing administrator",
        });
      }

      const result = await TermChangeService.approveRequest({
        requestId,
        reviewedBy,
        reviewComment,
      });

      return res.status(200).json({
        success: true,
        message: "Term change request approved successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  /* ========================================================
     SYSTEM ADMIN
     REJECT REQUEST
  ======================================================== */

  rejectRequest = async (req, res, next) => {
    try {
      const { requestId } = req.params;

      const { reviewComment } = req.body || {};

      const reviewedBy =
        req.user?.id ||
        req.user?.userId ||
        req.user?.userAccountId ||
        req.user?.email ||
        req.user?.username;

      if (!reviewedBy) {
        return res.status(401).json({
          success: false,
          message: "Unable to identify the reviewing administrator",
        });
      }

      const result = await TermChangeService.rejectRequest({
        requestId,
        reviewedBy,
        reviewComment,
      });

      return res.status(200).json({
        success: true,
        message: "Term change request rejected successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new TermChangeController();
