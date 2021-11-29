const express = require("express");
const router = express.Router();

const orderController = require("./../controllers/orderController");
const authController = require("./../controllers/authController");

router
  .route("/order/new")
  .post(authController.isAuthenticatedUser, orderController.newOrder);

router
  .route("/order/me")
  .get(authController.isAuthenticatedUser, orderController.myOrders);

router
  .route("/order/:id")
  .get(authController.isAuthenticatedUser, orderController.getSingleOrder);

router
  .route("/admin/orders")
  .get(
    authController.isAuthenticatedUser,
    authController.authorizeRoles("admin"),
    orderController.allOrders
  );

router
  .route("/admin/order/:id")
  .put(
    authController.isAuthenticatedUser,
    authController.authorizeRoles("admin"),
    orderController.updateOrder
  )
  .delete(
    authController.isAuthenticatedUser,
    authController.authorizeRoles("admin"),
    orderController.deleteOrder
  );

module.exports = router;
