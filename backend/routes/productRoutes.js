const express = require("express");

const { createProduct, deleteProduct, getAllProduct } = require("../controllers/productControllers");

const router = express.Router();

router.route("/allproducts").get(getAllProduct);
router.route("/product/new").post(createProduct);
router.route("/product/:id").delete(deleteProduct);

module.exports = router;