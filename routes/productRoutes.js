const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

// routes

// get all products in database
router.route("/products").get(productController.getProducts);
router.route("/product/:id").get(productController.getSingleProduct);
router
  .route("/admin/product/new")
  .post(
    authController.isAuthenticatedUser,
    authController.authorizeRoles("admin"),
    productController.newProduct
  );
router
  .route("/admin/product/:id")
  .put(
    authController.isAuthenticatedUser,
    authController.authorizeRoles("admin"),
    productController.updateProduct
  );
router
  .route("/admin/product/:id")
  .delete(
    authController.isAuthenticatedUser,
    authController.authorizeRoles("admin"),
    productController.deleteProduct
  );

router
  .route("/review")
  .put(
    authController.isAuthenticatedUser,
    productController.createProductReview
  );

router
  .route("/reviews")
  .get(authController.isAuthenticatedUser, productController.getProductReviews);

router
  .route("/reviews")
  .delete(authController.isAuthenticatedUser, productController.deleteReview);

module.exports = router;
