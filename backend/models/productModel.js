// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//     id:{
//         type: Number,
//         required: true
//     },
//     name:{
//         type: String,
//         required: true
//     },
//     image:{
//         type: String,
//         required: true
//     },
//     category:{
//         type: String,
//         required: true
//     },
//     new_price:{
//         type: Number,
//         required: true
//     },
//     old_price:{
//         type: Number,
//         required: true
//     },
//     date:{
//         type: Date,
//         default: Date.now
//     },
//     avilable:{
//         type: Boolean,
//         default: true
//     }

// });


// module.exports = mongoose.model("product", productSchema);


// models/product.js

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    sizes: [{
        type: String // or type: Number, depending on your use case
    }],
    date: {
        type: Date,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("product", productSchema);
