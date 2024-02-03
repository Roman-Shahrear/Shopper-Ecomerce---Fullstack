const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(express.json());
// CORS configuration
const allowedOrigins = ["http://localhost:5173"]; // Adjust as needed

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

app.use(cors(corsOptions));

app.use(express.json());

// Route Imports
const product = require("./routes/productRoutes");

app.use("/api/v1", product);


//Error middleware
const errorMiddleware = require("./middleware/error");

// config
dotenv.config({path:"backend/config/config.env"});

// Image Storage Engine configuration
const storage = multer.diskStorage({
    destination: path.join(__dirname, "upload/images"),
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

// For using multer
const upload = multer({ storage: storage });

// Creating Upload Endpoint for images
app.use("/images", express.static(path.join(__dirname, "upload/images")));


app.post("/upload", upload.single("product"), (req, res)=>{
    res.json({
        success: 1,
        image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`
    });
});



module.exports = app;

