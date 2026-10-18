
import express from "express";
import AdminProfileController from "./profile.controller.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| GET ADMIN PROFILE
|--------------------------------------------------------------------------
| GET /api/admin/profile
*/

router.get(
  "/",
  (req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
  },
  AdminProfileController.getProfile,
);

/*
|--------------------------------------------------------------------------
| CREATE ADMIN PROFILE
|--------------------------------------------------------------------------
| POST /api/admin/profile
*/

router.post(
  "/",
  AdminProfileController.createProfile,
);

/*
|--------------------------------------------------------------------------
| UPDATE ADMIN PROFILE
|--------------------------------------------------------------------------
| PUT /api/admin/profile
*/

router.put(
  "/",
  AdminProfileController.updateProfile,
);

export default router;
