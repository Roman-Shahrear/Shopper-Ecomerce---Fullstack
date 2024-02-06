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
        sizes: req.body.sizes || [], // Add sizes property with default as an empty array
    });

    console.log("Product Object:", product);

    await product.save();

    console.log("Product Saved");

    res.status(201).json({
        success: true,
        data: product,
    });
});

// Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const productId = req.params.id;

    // Validate if productId is a number
    if (isNaN(productId)) {
        return next(new ErrorHandler('Invalid product ID', 400));
    }

    // Find and delete the product
    const product = await Product.findOneAndDelete({ id: productId });

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    console.log("Product Removed");

    res.status(200).json({
        success: true,
        data: product,
    });
});

// Get All Products
exports.getAllProduct = catchAsyncErrors(async (req, res, next) => {
    // Fetch all products
    const products = await Product.find({});
    console.log("All Products Fetched");

    res.status(200).json({
        success: true,
        data: products,
    });
});

//New Collection
exports.newCollection = catchAsyncErrors(async (req, res, next) => {
    // Assuming Product is a Mongoose model
    let products = await Product.find({});
    
    // Ensure there are at least 8 products before slicing
    let newCollection = products.length >= 8 ? products.slice(-8) : products;

    console.log("New Collection Fetched");
    res.send(newCollection);
});

// Popular Women collection
exports.popularCollectionInWomen = catchAsyncErrors(async(req, res, next)=>{
    let products = await Product.find({category:"women"});
    let popularCollectionInWomen = products.length >= 4 ? products.slice(0, 4) : products;
    console.log("Popular in women fetched");
    res.send(popularCollectionInWomen);
});

//Add to cart
exports.addToCart = catchAsyncErrors(async(req, res, next)=>{
    console.log(req.body);
})

