const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create Product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    // Fetch all products to determine the next id
    let products = await Product.find({});
    
    let id;
    if (products.length > 0) {
        let lastProduct = products[products.length - 1];
        id = lastProduct.id + 1;
    } else {
        id = 1;
    }

    const product = new Product({
        id: id, // Use the generated id
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });

    console.log("Product Object:", product);

    await product.save();

    console.log("Saved");

    res.json({
        success: true,
        name: req.body.name,
    });
});

//Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    });
});

//Getting All product
exports.getAllProduct = catchAsyncErrors(async (req, res, next) => {
     // Fetch all products
     let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
});
