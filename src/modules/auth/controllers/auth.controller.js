import AuthService from "../services/auth.service.js";

import ApiResponse from "../../../utils/ApiResponse.js";

import asyncHandler from "../../../utils/asyncHandler.js";

class AuthController {
  login = asyncHandler(async (req, res) => {
    const { identifier, password } = req.body;

    const result = await AuthService.login(identifier, password);

    return res
      .status(200)
      .json(new ApiResponse(200, "Login successful", result));
  });
}

export default new AuthController();