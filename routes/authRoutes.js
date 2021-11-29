const express = require("express");
const router = express.Router();

const authController = require("./../controllers/authController");

// AUTHENTICATION
router.route("/register").post(authController.registerUser);
router.route("/login").post(authController.loginUser);
router.route("/password/forgot").post(authController.forgotPassword);
router.route("/password/reset/:token").put(authController.resetPassword);
router.route("/logout").get(authController.logout);

// USER
router
  .route("/me")
  .get(authController.isAuthenticatedUser, authController.getUserProfile);
router
  .route("/password/update")
  .put(authController.isAuthenticatedUser, authController.updatePassword);
router
  .route("/me/update")
  .put(authController.isAuthenticatedUser, authController.updateProfile);
module.exports = router;

router
  .route("/admin/users")
  .get(
    authController.isAuthenticatedUser,
    authController.authorizeRoles("admin"),
    authController.allUsers
  );

router
  .route("/admin/user/:id")
  .get(
    authController.isAuthenticatedUser,
    authController.authorizeRoles("admin"),
    authController.getUserDetails
  )
  .patch(
    authController.isAuthenticatedUser,
    authController.authorizeRoles("admin"),
    authController.updateUser
  )
  .delete(
    authController.isAuthenticatedUser,
    authController.authorizeRoles("admin"),
    authController.deleteUser
  );

module.exports = router;
