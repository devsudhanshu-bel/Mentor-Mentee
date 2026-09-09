import AuthService from "../services/auth.service.js";

class AuthController {
  // ========================================================
  // LOGIN
  // ========================================================

  login = async (req, res, next) => {
    try {
      const { identifier, password } = req.body;

      // ====================================================
      // AUTHENTICATE
      // ====================================================

      const response = await AuthService.login(identifier, password);

      // ====================================================
      // RESPONSE
      // ====================================================

      return res.status(200).json({
        success: true,

        message: "Login successful",

        data: response,
      });
    } catch (error) {
      next(error);
    }
  };

  // ========================================================
  // CHANGE PASSWORD
  // ========================================================

  changePassword = async (req, res, next) => {
    try {
      // ====================================================
      // AUTHENTICATION CHECK
      // ====================================================

      if (!req.user?.id) {
        return res.status(401).json({
          success: false,

          message: "Authentication required",
        });
      }

      // ====================================================
      // REQUEST BODY
      // ====================================================

      const { currentPassword, newPassword } = req.body;

      // ====================================================
      // CHANGE PASSWORD
      // ====================================================

      const response = await AuthService.changePassword(
        req.user.id,
        currentPassword,
        newPassword,
      );

      // ====================================================
      // RESPONSE
      // ====================================================

      return res.status(200).json({
        success: true,

        message: response.message,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new AuthController();
