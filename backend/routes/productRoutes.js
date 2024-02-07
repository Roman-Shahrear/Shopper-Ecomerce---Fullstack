const express = require("express");

const { createProduct, deleteProduct, getAllProduct, newCollection, popularCollectionInWomen } = require("../controllers/productControllers");

const router = express.Router();

router.route("/allproducts").get(getAllProduct);
router.route("/product/new").post(createProduct);
router.route("/product/:id").delete(deleteProduct);

router.route("/products/newcollection").get(newCollection);
router.route("/products/popular/inwomen").get(popularCollectionInWomen);


module.exports = router;