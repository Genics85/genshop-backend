const express = require("express");
const router = express.Router();
const products = require("../controllers/product");
const multer = require("../config/multerConfig");

//for uploading product and information to the database
router
  .route("/upload")
  .post(multer.single("image"), products.upload)
  .get((req, res) => {
    console.log("get all items");
  });

  //for getting all products in the database
  router.route("/getAll").get(products.getAll);

  //for deleting a product from the database
router.route("/:id").delete(products.remove);

//for getting products with specific category
router.route("/fashion").get(products.getCategory("fashion"));
router.route("/grocery").get(products.getCategory("grocery"));
router.route("/electronics").get(products.getCategory("electronics"));
router.route("/home").get(products.getCategory("home"));
router.route("/health").get(products.getCategory("health"));

module.exports = router;
